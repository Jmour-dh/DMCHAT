import express, { Router } from "express";
import UserController from "../controllers/users.controller";
import upload from "../middlewares/handleUpload";
import { hashPassword, verifyPassword, verifyToken,expiredSessionToken } from "../middlewares/auth";

const router: Router = express.Router();

router.post("/verifyPseudo", UserController.verifyPseudoAvailability);
router.post("/verifyEmail", UserController.verifyEmailAvailability);

// Verify Email
router.post("/verifyUser", UserController.getUserByEmail);
router.post("/verifyKey", UserController.verifyKey);
router.post("/resetPassword", hashPassword, UserController.resetPassword);

router.post("/login", UserController.login, verifyPassword);
router.post(
  "/users",
  upload.single("profileImage"),
  hashPassword,
  UserController.create
);
router.use(verifyToken);
router.get("/users/:id", UserController.getUserById);
router.get("/users", UserController.getAllUsers);
router.put("/users/:id", UserController.updateUser);
router.put("/updatePassword/:id", hashPassword, UserController.updatePassword);
router.delete("/users/:id", UserController.deleteUser);
router.get("/logout", UserController.logout, expiredSessionToken);

export default router;
