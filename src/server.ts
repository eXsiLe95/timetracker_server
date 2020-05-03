import express = require("express");
import {WorkPlaceController} from "./controller/WorkPlaceController";
import {ProjectController} from "./controller/ProjectController";
import {Connection, createConnection} from 'typeorm';
import {UserController} from "./controller/UserController";

const {
    PORT = 8080
} = process.env;

const app = express();

app.use(express.json());

app.use('/', express.static(__dirname + '/frontend'))

app.listen(PORT, async () => {
    const connection: Connection = await createConnection();

    await WorkPlaceController.initORM(connection);
    await ProjectController.initORM(connection);
    await UserController.initORM(connection);

    console.info('Server started on http://localhost:' + PORT);
});

// Workplace routes
app.get('/api/workplaces', WorkPlaceController.getAll);

app.post('/api/workplace', WorkPlaceController.create);
app.get('/api/workplace/:workPlaceId', WorkPlaceController.get)
app.put('/api/workplace/:workPlaceId', WorkPlaceController.update);
app.delete('/api/workplace/:workPlaceId', WorkPlaceController.delete);

// Project routes
app.get('/api/projects', ProjectController.getAll);

app.post('/api/project', ProjectController.create);
app.get('/api/project/:projectId', ProjectController.get)
app.put('/api/project/:projectId', ProjectController.update);
app.delete('/api/project/:projectId', ProjectController.delete);

// User routes
app.get('/api/users', UserController.getAll);

app.post('/api/user', UserController.create);
app.get('/api/user/:userId', UserController.get)
app.put('/api/user/:userId', UserController.update);
app.delete('/api/user/:userId', UserController.delete);

// Time tracking routes
