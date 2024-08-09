import { DataTypes, } from "sequelize";

const Admin=(sequelize)=>{
    return sequelize.define('Admin',{
        key:{
            type: DataTypes.TEXT,
            primaryKey:true,
            unique:true
        },
        id:{
            type:DataTypes.INTEGER,
            references:{
                module:'users',
                key:'id'
            }
        },
    },{
        tableName:'admin',
        timeStamps:false
    })
}
export default Admin