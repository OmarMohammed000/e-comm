import { DataTypes } from "sequelize";

const Cart = (sequelize) => {
  return sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "carts",
      timestamps: false,
    }
  );
};
export default Cart