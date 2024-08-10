import { DataTypes } from "sequelize";

const ProductSubcategory = (sequelize) => {
  return sequelize.define(
    "ProductSubcategory",
    {
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "subcategories",
          key: "id",
        },
      },
    },
    {
      tableName: "product_subcategories",
      timestamps: false,
      primaryKey: {
        type: DataTypes.INTEGER,
        fields: ["product_id", "subcategory_id"],
      },
    }
  );
};
export default ProductSubcategory
