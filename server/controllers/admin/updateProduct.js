import db from "../../models/index.js";

async function updateProductAndImages(req, res) {
 // this part must be changed after devolping frontend it only made like this for post man
    const jsonID =JSON.parse( req.params.id);
    
  const  id  =parseInt(jsonID);
  
  
  const jsonData = JSON.parse(req.body.data);
  const { title, description, price } = jsonData;
  
  const images = req.files ? req.files.map(file => file.filename) : []; 
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
  
        // Then, add the new images
        const imagePromises = images.map((imagePath) => {
          return db.Image.create(
            {
              image_location: imagePath,
              productId: id,
            },
            { transaction }
          );
        });
  
        // Wait for all images to be created
        await Promise.all(imagePromises);
      }
    // Commit the transaction
    await transaction.commit();

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
