import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "assets/upload");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
