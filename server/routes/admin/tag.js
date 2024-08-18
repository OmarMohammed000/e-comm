import express from "express";

import createTag from "../../controllers/admin/CreateTag.js";
import deleteTag from "../../controllers/admin/deleteTag.js";
import readTag from "../../controllers/admin/readTag.js";
import updateTag from "../../controllers/admin/updateTag.js";
import removeTagsFromProduct from "../../controllers/admin/removeTag.js";
import addTag from "../../controllers/admin/addTag.js";

const router =express.Router();

router.get("/tags",readTag);
router.post("/tags",createTag);
router.patch("/tags/:id",updateTag);
router.delete("/tags/:id",deleteTag);
// route for adding/removing  tags to products
router.post("/add-tags",addTag)
router.delete("/remove-tags",removeTagsFromProduct)
export default router