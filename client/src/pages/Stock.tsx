import React, { useState } from "react";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

import PopUp from "../components/PopUp";
import Form from "../components/Form";

const StockPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState(false);

  return (
    <Layout>
      <div className="my-6 flex justify-between">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Item List
          </span>
        </h1>
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
          className="border rounded bg-primary hover:bg-primaryDark px-4 text-themeWhite"
        >
          Add Item
        </button>
      </div>
      <PopUp visibility={formVisibility}>
        <Form setVisibility={setFormVisibility} />
      </PopUp>
      <ItemTable />
    </Layout>
  );
};

export default StockPage;
