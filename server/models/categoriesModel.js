import { DataTypes } from "sequelize";

const Category = (sequelize) => {
  return sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    details: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'categories',
    timestamps: false
  });
}

export default Category;
