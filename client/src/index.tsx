import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/index.css";

import HomePage from "./pages/Home";
import StockPage from "./pages/Stock";
import CategoryPage from "./pages/Categories";
import WarehousesPage from "./pages/Warehouses";
import SuppliersPage from "./pages/Suppliers";
import UsersPage from "./pages/Users";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stock" element={<StockPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/warehouses" element={<WarehousesPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
