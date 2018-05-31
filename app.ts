import * as express from "express";
import {SplashController, IndexController} from "./routes";

const app: express.Application = express();
const port: number = 3000;

app.use("/splash", SplashController);
app.use("/", IndexController);
app.listen(port, () =>
{

});
