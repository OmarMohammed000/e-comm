import db from "../../models/index.js";
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

    // Save the image paths in the Image table
    const imagePromises = req.files.map((file) => {
      return db.Image.create({
        image_location: file.filename,
        productId: product.id,
      });
    });

    await Promise.all(imagePromises);

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