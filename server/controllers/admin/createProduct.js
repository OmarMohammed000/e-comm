import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";
async function createProduct(req, res) {
  try {
    // this part must be changed after devolping frontend it only made like this for post man
    const jsonData = JSON.parse(req.body.data);
    const { title, description, price } = jsonData;
    // end
    // Create the product
    const product = await db.Product.create({
      title,
      description,  
      price,
    });

     // Upload each image to Cloudinary and save the returned URL in the database
     const imageUploadPromises = req.files.map(async (file) => {
       const result = await cloudinary.uploader.upload(file.path, {
        upload_preset:"esqif1y0"
        });
        return db.Image.create({
          image_location: result.secure_url, // Use the URL from Cloudinary
          productId: product.id,
        });
      });
      
      await Promise.all(imageUploadPromises);

    res
      .status(201)
      .json({ message: "Product and images uploaded successfully", product });
  } catch (error) {
    console.error("Error uploading product and images:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while uploading the product and images",
      });
  }
}
export default createProduct;