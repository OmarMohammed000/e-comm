import { DataTypes } from "sequelize";

const ProducTag = (sequelize) => {
  sequelize.define(
    "ProductTag",
    {
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "tag_id",
        },
      },
    },
    {
      tableName: "product_tags",
      timestamps: false,
      primaryKey: {
        type: DataTypes.INTEGER,
        fields: ["product_id", "tag_id"],
      },
    }
  );
};
export default ProducTag;
