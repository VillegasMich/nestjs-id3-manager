import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { extname } from 'path';

export const mp3FileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (extname(file.originalname).toLowerCase() !== '.mp3') {
    // return callback(new Error('Only .mp3 files are allowed!'), false);
    return callback(null, false);
  }
  callback(null, true);
};
