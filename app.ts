import * as express from 'express';
import {SplashController} from "./routes";

const app : express.Application() = express();
const port : number = process.env.PORT || 3000;

app.use('/splash', SplashController);
app.listen(port, () =>
{
  console.log('Listening at http://localhost:${port}');
});
