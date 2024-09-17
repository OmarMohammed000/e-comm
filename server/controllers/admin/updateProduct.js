import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";
async function updateProductAndImages(req, res) {
 // this part must be changed after devolping frontend it only made like this for post man
    const jsonID =JSON.parse( req.params.id);
    
  const  id  =parseInt(jsonID);
  
  
  const jsonData = JSON.parse(req.body.data);
  const { title, description, price } = jsonData;
  
  const images = req.files ? req.files.map(file => file.filename) : console.log("false"); 
  // end 
  if(isNaN(id)){
    return res.status(400).json({message:"Invalid Product ID"});
  }
  let transaction  
  try {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    // Update the product details
    const updatedProduct = await db.Product.update(
      { title, description, price },
      { where: { id: id }, transaction }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    // If there are new images to add
    if (images.length > 0) {
        // First, remove existing images related to this product
        await db.Image.destroy({
          where: { productId: id },
          transaction,
        });
        console.log("in")
        // Then, add the new images
        const imageUploadPromises = req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
           upload_preset:"esqif1y0"
           });
           console.log("uploder")
           return db.Image.create({
             image_location: result.secure_url, 
             productId: id,
           });
         });
         
         await Promise.all(imageUploadPromises);
      }
    // Commit the transaction
    await transaction.commit();
    console.log("out")
    res
      .status(200)
      .json({ message: "Product and images updated successfully" });
  } catch (error) {
    console.error("Error updating product and images:", error);

    if (transaction) await transaction.rollback();

    res.status(500).json({
      message: "An error occurred while updating the product and images",
    });
  }
}

export default updateProductAndImages;
