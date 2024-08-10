import { DataTypes } from "sequelize";

const Subcategory = (sequelize) => {
  return sequelize.define(
    "Subcategory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      tableName: "subcategories",
      timestamps: false,
    }
  );
};
export default Subcategory;