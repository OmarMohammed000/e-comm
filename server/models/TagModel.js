import { DataTypes } from "sequelize";

const Tag = (sequelize) => {
  return sequelize.define(
    "Tag",
    {
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );
};
export default Tag
