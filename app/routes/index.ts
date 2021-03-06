import {Request, Response, Router} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("clicker/clicker");
});

export const IndexController : Router = router;

export * from "./index";
