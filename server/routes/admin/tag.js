import express from "express";

import createTag from "../../controllers/admin/CreateTag.js";
import deleteTag from "../../controllers/admin/deleteTag.js";
import readTag from "../../controllers/admin/readTag.js";
import updateTag from "../../controllers/admin/updateTag.js";
import removeTagsFromProduct from "../../controllers/admin/removeTag.js";
import addTag from "../../controllers/admin/addTag.js";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import getProductTagsById from "../../controllers/admin/getProductTagsById.js";

const router =express.Router();

router.get("/tags",readTag);
router.post("/tags",authorizeToken,createTag);
router.patch("/tags/:id",authorizeToken,updateTag);
router.delete("/tags/:id",authorizeToken,deleteTag);
// route for adding/removing and geting  tags to products
router.post("/addTags",authorizeToken,addTag)
router.get("/product/tags/:productid",authorizeToken,getProductTagsById);
router.delete("/removeTags",authorizeToken,removeTagsFromProduct)
export default router