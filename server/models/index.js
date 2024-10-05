import { Sequelize } from "sequelize";
import config from "../utils/config.js";
// importing the models
import User from "./UserModel.js";
import Product from "./ProductModel.js";
import Category from "./CategoriesModel.js";
import Subcategory from "./SubcategoryModel.js";
import ProductSubcategory from "./ProductSubcategory.js";
import Cart from "./CartsModel.js";
import CartItem from "./CartitemsModel.js";
import Order from "./OrderModel.js";
import OrderItem from "./OrderItemModel.js";
import Tag from "./TagModel.js";
import ProductTag from "./ProductTagModel.js";
import Image from "./ProductImagesModel.js"; 

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  }
);
const db = {};
// S is the sequelize library and s is connection to the DB
db.Sequelize = Sequelize;
db.sequelize = sequelize;




// Init the models
db.User = User(sequelize, Sequelize);
db.Product = Product(sequelize, Sequelize);
db.Category = Category(sequelize, Sequelize);
db.Subcategory = Subcategory(sequelize, Sequelize);
db.ProductSubcategory = ProductSubcategory(sequelize, Sequelize);
db.Cart = Cart(sequelize, Sequelize);
db.CartItem = CartItem(sequelize, Sequelize);
db.Order = Order(sequelize, Sequelize);
db.OrderItem = OrderItem(sequelize, Sequelize);
db.Tag = Tag(sequelize, Sequelize);
db.ProductTag = ProductTag(sequelize, Sequelize);
db.Image=Image(sequelize,Sequelize);


db.Category.hasMany(db.Subcategory, { foreignKey: 'category_id' });
db.Subcategory.belongsTo(db.Category, { foreignKey: 'category_id' });


db.Product.belongsToMany(db.Subcategory, {
  through: db.ProductSubcategory,
  foreignKey: "product_id",
});
db.Subcategory.belongsToMany(db.Product, {
  through: db.ProductSubcategory,
  foreignKey: "subcategory_id",
});

db.Product.hasMany(db.Image, { foreignKey: "productId"});
db.Image.belongsTo(db.Product, { foreignKey: "productId" });

db.User.hasMany(db.Cart, { foreignKey: "user_id" });
db.Cart.belongsTo(db.User, { foreignKey: "user_id" });

db.Cart.hasMany(db.CartItem, { foreignKey: "cart_id" });
db.CartItem.belongsTo(db.Cart, { foreignKey: "cart_id" });

db.Product.hasMany(db.CartItem, { foreignKey: "product_id" });
db.CartItem.belongsTo(db.Product, { foreignKey: "product_id" });

db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });

db.Order.hasMany(db.OrderItem, { foreignKey: "order_id" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "order_id" });

db.Product.hasMany(db.OrderItem, { foreignKey: "product_id" });
db.OrderItem.belongsTo(db.Product, { foreignKey: "product_id" });

db.Product.belongsToMany(db.Tag, {
  through: db.ProductTag,
  foreignKey: "product_id",
});
db.Tag.belongsToMany(db.Product, {
  through: db.ProductTag,
  foreignKey: "tag_id",
});

export default db