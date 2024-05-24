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
import { userController } from "../controllers";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.sendFile("apiOn.html", { root: publicDirectory });
  } catch (error) {
    res.sendFile("apiOff.html", { root: publicDirectory });
  }
});

router.get("/register", authMiddleware, userController.index);
router.post("/register", userController.store);

router.use((req: Request, res: Response) => {
  res.sendFile("404matrix.html", { root: publicDirectory });
});

export default router;
