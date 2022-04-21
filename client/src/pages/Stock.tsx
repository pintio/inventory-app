import React from "react";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

const StockPage = function (): JSX.Element {
  return (
    <Layout>
      <ItemTable />
    </Layout>
  );
};

export default StockPage;
