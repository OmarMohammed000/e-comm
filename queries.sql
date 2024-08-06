CREATE TABLE users(
	id serial primary key,
	user_name varchar(100),
	password varchar(50),
	email varchar(150),
	address text,
	phone varchar(20)
);
CREATE TABLE admins(
	key text primary key UNIQUE,
	id int  REFERENCES users(id),
	name text 
);
CREATE TABLE products(
	id serial PRIMARY KEY,
	title text NOT NULL,
	description text,
	price numeric(10, 2) NOT NULL,
	image_location text
);

CREATE TABLE categories(
	id serial primary key ,
	name varchar(50),
	details text
);
CREATE TABLE subcategories(
	id serial primary key,
	name varchar(50),
	category_id int,
	FOREIGN KEY (id) REFERENCES categories(id) 
	
);
CREATE TABLE product_subcategories(
	product_id int NOT NULL,
	subcategory_id int NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE,
	PRIMARY KEY (product_id, subcategory_id)
);

CREATE TABLE carts(
	id serial primary key,
	user_id int ,
	FOREIGN  KEY (user_id)REFERENCES users(id)
);
CREATE TABLE cart_items(
	id serial primary key ,
	cart_id int,
	product_id int ,
	quantity int ,
	FOREIGN KEY (cart_id) REFERENCES carts(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE orders(
	id serial primary key,
	user_id int ,
	time_of_order timestamp, 
	to_address text,
	to_city text,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_items(
	id serial primary key,
	order_id int ,
	product_id int ,
	FOREIGN KEY (order_id)REFERENCES orders(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);