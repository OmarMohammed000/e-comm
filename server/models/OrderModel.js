import { DataTypes } from "sequelize";

const Order = (sequelize) => {
  sequelize.define(
    "Order",
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
      time_of_order: {
        type: DataTypes.DATE,
        allowNull:false
      },
      to_address: {
        type: DataTypes.TEXT,
        allowNull:false,
      },
      to_city: {
        type: DataTypes.TEXT,
        allowNull:false,
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );
};
export default Order;
