import { DataTypes } from "sequelize";

const OrderItem = (sequelize) => {
  return sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },quantity: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "order_items",
      timestamps: false,
    }
  );
};
export default OrderItem;