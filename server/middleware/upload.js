import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadRoot = path.resolve('uploads');

const ensureDir = (dirName) => {
  const dirPath = path.join(uploadRoot, dirName);
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const target = file.fieldname === 'cv' ? 'cvs' : file.fieldname === 'note' ? 'notes' : 'profiles';
    cb(null, ensureDir(target));
  },
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image uploads are allowed for profile photo.'));
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed.'));
};

export const profileUpload = multer({ storage, fileFilter: imageFilter });
export const pdfUpload = multer({ storage, fileFilter: pdfFilter });
