
import { DataTypes } from "sequelize";

const Product=(sequelize)=>{
    return sequelize.define("Product",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false
        },image_location: {
            type: DataTypes.TEXT
        }
    })
}
export default Product