import express = require('express');
import {WorkPlaceController} from './controller/WorkPlaceController';
import {ProjectController} from './controller/ProjectController';
import {Connection, createConnection} from 'typeorm';
import {UserController} from './controller/UserController';
import * as session from 'express-session';
import * as passport from 'passport';
import {Profile} from 'passport';
import {AuthenticationController} from './controller/AuthenticationController';
import {GoogleConfiguration} from '../config/GoogleConfiguration';
import {SessionConfiguration} from '../config/SessionConfiguration';

const {
    PORT = 8080,
} = process.env;

const app = express();

app.use(express.json());

app.use(session(SessionConfiguration.sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(GoogleConfiguration.googleStrategy);

passport.serializeUser((profile: Profile, done: Function) => {
    done(null, profile);
});

passport.deserializeUser((profile: Profile, done: Function) => {
    done(null, profile);
});

app.use('/', express.static(__dirname + '/frontend'))

app.listen(PORT, async () => {
    const connection: Connection = await createConnection();

    await WorkPlaceController.initORM(connection);
    await ProjectController.initORM(connection);
    await UserController.initORM(connection);

    console.info('Server started on http://localhost:' + PORT);
});

// Authentication routes
// TODO Remove
app.get('/api/auth/me', AuthenticationController.isLoggedIn, AuthenticationController.me);
app.get('/api/auth/google/success', AuthenticationController.isLoggedIn, AuthenticationController.loggedIn);
app.get('/api/auth/logout', AuthenticationController.logout);
app.get('/api/auth/google', passport.authenticate(GoogleConfiguration.AUTHENTICATION_STRATEGY_GOOGLE,
    GoogleConfiguration.googleStrategyAuthenticationOptions));
app.get('/api/auth/google/callback', passport.authenticate(GoogleConfiguration.AUTHENTICATION_STRATEGY_GOOGLE,
    GoogleConfiguration.googleStrategyAuthenticationRedirection));

// Workplace routes
app.get('/api/workplaces', AuthenticationController.isLoggedIn, WorkPlaceController.getAll);

app.post('/api/workplace', AuthenticationController.isLoggedIn, WorkPlaceController.create);
app.get('/api/workplace/:workPlaceId', AuthenticationController.isLoggedIn, WorkPlaceController.get)
app.put('/api/workplace/:workPlaceId', AuthenticationController.isLoggedIn, WorkPlaceController.update);
app.delete('/api/workplace/:workPlaceId', AuthenticationController.isLoggedIn, WorkPlaceController.delete);

// Project routes
app.get('/api/projects', AuthenticationController.isLoggedIn, ProjectController.getAll);

app.post('/api/project', AuthenticationController.isLoggedIn, ProjectController.create);
app.get('/api/project/:projectId', AuthenticationController.isLoggedIn, ProjectController.get)
app.put('/api/project/:projectId', AuthenticationController.isLoggedIn, ProjectController.update);
app.delete('/api/project/:projectId', AuthenticationController.isLoggedIn, ProjectController.delete);

// User routes
app.get('/api/users', AuthenticationController.isLoggedIn, UserController.getAll);

app.post('/api/user', AuthenticationController.isLoggedIn, UserController.create);
app.get('/api/user/:userId', AuthenticationController.isLoggedIn, UserController.get)
app.put('/api/user/:userId', AuthenticationController.isLoggedIn, UserController.update);
app.delete('/api/user/:userId', AuthenticationController.isLoggedIn, UserController.delete);

// Time tracking routes
