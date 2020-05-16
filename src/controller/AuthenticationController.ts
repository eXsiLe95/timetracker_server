import {NextFunction, Request, Response} from 'express';
import {User} from '../entity/User';
import {UserService} from '../service/UserService';

export class AuthenticationController {

    static async isLoggedIn(request: Request, response: Response, next: NextFunction) {
        if (request.isAuthenticated()) {
            return next();
        } else {
            response.redirect('/api/auth/google');
        }
    }

    static async logout(request: Request, response: Response) {
        request.logout();
        response.redirect('/');
    }

    static async loggedIn(request: Request, response: Response) {
        const user: User = new User();
        user.firstName = request.user['name'].givenName;
        user.lastName = request.user['name'].familyName;
        user.mail = request.user['emails'][0].value;

        const databaseUser: User = await UserService.search(user);
        if (!databaseUser) {
            user.projects = [];
            user.workPlaces = [];
            const newUser: User = await UserService.create(user);
            request.user['id'] = newUser.id;
        } else {
            request.user['id'] = databaseUser.id;
        }

        response.redirect('/api/auth/me');
    }

    // TODO Remove
    static async me(request: Request, response: Response) {
        response.status(200).send(request.user);
    }

}
