import { fileURLToPath } from "url";

import multer from "multer";


const storage = multer.diskStorage({
    
    filename: (req, file, cb) => {
      const filename= new Date().toISOString().replace(/:/g, '-') + '-'+  file.originalname 
      cb(null, filename);
      req.filename=filename;
    },
  });

const upload = multer({ storage }).array('images', 5); // 'images' is the field name and 5 is the max number of files

export default upload;
