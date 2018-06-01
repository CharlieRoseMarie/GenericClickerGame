import {Request, Response, Router} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
});

export const IndexController : Router = router;

export * from "./splash";
export * from "./index";
