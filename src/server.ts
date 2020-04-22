import express = require("express");
import {WorkPlaceController} from "./controller/WorkPlaceController";

const {
    PORT = 8080
} = process.env;

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/frontend'))

app.listen(PORT, async () => {
    await WorkPlaceController.init();
    console.info('Server started on http://localhost:' + PORT);
});

app.get('/workplaces', WorkPlaceController.getAll);

app.post('/workplace', WorkPlaceController.create);
app.get('/workplace/:workPlaceId', WorkPlaceController.get)
app.put('/workplace/:workPlaceId', WorkPlaceController.update);
app.delete('/workplace/:workPlaceId', WorkPlaceController.delete);
