import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const fileName =
      crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
