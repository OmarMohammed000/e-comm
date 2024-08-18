import db from "../../models/index.js";

async function addTag(req,res) {
    const { productId, tagIds } = req.body;

    try {
        // Find the product by ID
        const product = await db.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const validTags = await db.Tag.findAll({
            where: {
                tag_id: tagIds,
            },
        });

        if (validTags.length !== tagIds.length) {
            return res.status(400).json({ message: 'One or more tags do not exist' });
        }

        // Add tags to the product
        // The addTags method is automatically available because of the belongsToMany association.
        await product.addTags(tagIds);  // tagIds should be an array of tag IDs

        res.status(200).json({ message: 'Tags added to product successfully' });
    } catch (error) {
        console.error('Error adding tags to product:', error);
        res.status(500).json({ message: 'An error occurred while adding tags to the product' });
    }
}
export default addTag;