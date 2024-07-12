// router
import { Router } from "express";
// params
import { Request, Response } from "express";
// path
import path from "path";
const publicDirectory = path.join(__dirname, "../../public");
// middleware
import { authMiddleware } from "../middleware/auth";
// controllers
import {
  userController,
  loginController,
  draftsController,
  commentsController,
} from "../controllers";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.sendFile("apiOn.html", { root: publicDirectory });
  } catch (error) {
    res.sendFile("apiOff.html", { root: publicDirectory });
  }
});

router.post("/register", userController.store);

router.post("/login", loginController.store);

router.get("/get-me", authMiddleware, userController.index);

router.post("/draft", authMiddleware, draftsController.store);
router.get("/draft", authMiddleware, draftsController.index);
router.get("/draft-all", authMiddleware, draftsController.indexAll);

router.post("/comments", authMiddleware, commentsController.store);
router.get("/comments", authMiddleware, commentsController.index);

router.use((req: Request, res: Response) => {
  res.sendFile("404matrix.html", { root: publicDirectory });
});

export default router;
