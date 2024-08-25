import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/claudinary';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: 'backend_prisma',
    };
  },
});

// size
const limit = {
  fileSize: 4e6,
};

//  file upload
const imageOnlyFilter = (_req: Request, file: any, cb: any) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpg|jpeg|png|JPG|JPEG|PNG/;
  if (!allowedExt.test(extName))
    return cb(new Error('File Extension JPG or PNG 2mb'), false);
  cb(null, true);
};

// upload image
const imageUpload = multer({
  storage: cloudinaryStorage,
  limits: limit,
  fileFilter: imageOnlyFilter,
}).single('image');

const upload = (req: Request, res: Response, next: NextFunction) => {
  imageUpload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
      return;
    }
    next();
  });
};

export default upload;
