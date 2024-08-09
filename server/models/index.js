import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "postgres",
  }
);
const db = {};
// S is the sequelize library and s is connection to the DB
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing the models
import User from "./UserModel";
import Admin from "./AdminModel";
import Product from "./ProductModel";
import Category from "./categoriesModel";
import Subcategory from "./SubcategoryModel";
import ProductSubcategory from "./ProductSubcategory";
import Cart from "./CartsModel";
import CartItem from "./CartitemsModel";
import Order from "./OrderModel";
import OrderItem from "./OrderItemModel";
import Tag from "./TagModel";
import ProductTag from "./ProductTagModel";
import { FOREIGNKEYS } from "sequelize/lib/query-types";

// Init the models
db.User = User(sequelize, Sequelize);
db.Admin = Admin(sequelize, Sequelize);
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

// defining relations

db.User.hasMany(db.Admin, { foreignKey: "id" });
db.Admin.belongsTo(db.User, { foreignKey: "id" });

db.Category.hasMany(db.Subcategory, { foreignKey: "category_id" });
db.Subcategory.belongsTo(db.Category, { foreignKey: "category_id" });

db.Product.belongsToMany(db.Subcategory, {
  through: db.ProductSubcategory,
  foreignKey: "product_id",
});
db.Subcategory.belongsToMany(db.Product, {
  through: db.ProductSubcategory,
  foreignKey: "subcategory_id",
});

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

module.exports = db;
