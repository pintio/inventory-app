import React, { useState } from "react";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

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
      <PopUp visibility={formVisibility} setVisibility={setFormVisibility} />
      <ItemTable />
    </Layout>
  );
};

const PopUp = function ({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: (value: React.SetStateAction<boolean>) => void;
}): JSX.Element {
  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900";
  return (
    <div
      className={`w-screen h-screen absolute left-0 top-0 flex items-center justify-center backdrop-blur-sm backdrop-opacity-80 backdrop-saturate-150 ${
        visibility ? "" : "hidden"
      }`}
    >
      <div className="bg-secondary-200 rounded-md border-[0.3px]  border-secondary-400 w-min text-secondary">
        <button
          onClick={() => {
            setVisibility(false);
          }}
          className=" float-right text-2xl font-bold mr-4 mt-1 text-secondary-700 hover:text-secondary-900"
        >
          X
        </button>
        <form className="px-16 py-8 " action="" method="POST">
          <label>
            Item Name:
            <input className={formInputClass} type="text" name="item-name" />
          </label>
          <label>
            Item Name:
            <input className={formInputClass} type="text" name="item-name" />
          </label>
          <label>
            Item Name:
            <input className={formInputClass} type="text" name="item-name" />
          </label>
          <button>
            <input className={formInputClass} type="submit" name="item-name" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockPage;
