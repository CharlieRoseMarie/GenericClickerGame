import * as express from "express";
import {SplashController, IndexController} from "./routes";
import * as path from "path";

export namespace App {
    export const app: express.Application = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(express.json());
    app.use(express.urlencoded({extended : false}));

    app.use("/splash", SplashController);
    app.use("/", IndexController);
}