import { DataTypes } from "sequelize";

const CartItem = (sequelize) => {
  sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "carts",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "cart_items",
      timestamps: false,
    }
  );
};
export default CartItem