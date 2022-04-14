CREATE TABLE materials (
    m_id SERIAL PRIMARY KEY,
    material_name TEXT UNIQUE,
    last_update TIMESTAMP,
    category_id INT REFERENCES categories(cat_id),
    warehouse_id INT REFERENCES warehouses(w_id),
    received_by INT REFERENCES users(user_id),
    supplier_id INT REFERENCES suppliers(s_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    fullname TEXT,
    position TEXT,
    joining_date DATE
);

CREATE TABLE suppliers (
    s_id SERIAL PRIMARY KEY,
    supplier_name TEXT UNIQUE
);

CREATE TABLE warehouses (
    w_id SERIAL PRIMARY KEY,
    warehouse_name TEXT UNIQUE
);

CREATE TABLE categories (
    cat_id SERIAL PRIMARY KEY,
    category_name TEXT UNIQUE
);