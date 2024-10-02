import db from "../../models/index.js";

async function removeTagsFromProduct(req, res) {
    const { productId, tagIds } = req.body;

    try {
        
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

        // Remove tags from the product
        await product.removeTags(tagIds);  // tagIds should be an array of tag IDs

        res.status(200).json({ message: 'Tags removed from product successfully', });
    } catch (error) {
        console.error('Error removing tags from product:', error);
        res.status(500).json({ message: 'An error occurred while removing tags from the product' });
    }
}

export default removeTagsFromProduct;