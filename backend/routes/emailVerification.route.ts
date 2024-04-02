import express, { Router } from 'express';
import EmailVerificationController from '../controllers/emailVerification.controller';

const router: Router = express.Router();

router.post("/sendVerification", EmailVerificationController.sendVerification);
router.post("/verifyEmailCode", EmailVerificationController.verifyEmail);

export default router;