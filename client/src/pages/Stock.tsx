import React from "react";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

const StockPage = function (): JSX.Element {
  return (
    <Layout>
      <div className="my-6">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Item List
          </span>
        </h1>
      </div>
      <ItemTable />
    </Layout>
  );
};

export default StockPage;
