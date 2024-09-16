import { fileURLToPath } from "url";
import path, { dirname } from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    
    filename: (req, file, cb) => {
      const filename= new Date().toISOString().replace(/:/g, '-') + '-'+  file.originalname 
      cb(null, filename);
      req.filename=filename;
    },
  });

const upload = multer({ storage }).array('images', 5); // 'images' is the field name and 10 is the max number of files

export default upload;
