import { DataTypes } from "sequelize";

const User=(sequelize)=>{
  return sequelize.define('User',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    user_name:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    password:{
      type:DataTypes.STRING(50),
      allowNull:false
    },
    email:{
      type:DataTypes.STRING(150),
      allowNull:false
    },
    address:{
      type:DataTypes.TEXT
    },
    phone:{
      type:DataTypes.STRING(20)
    }
  
  },{
    tableName:'users',
    timestamps:false
  });
};
export default User;