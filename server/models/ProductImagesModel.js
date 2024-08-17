import { DataTypes } from "sequelize";

const Image = (sequelize) => {
    return sequelize.define("Image", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image_location: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products", // refers to the 'Products' table
                key: "id",
            },
            onDelete: 'CASCADE',
        }
    }, {
        tableName: "product_imgs",
        timestamps: false,
    }
);
};

export default Image;