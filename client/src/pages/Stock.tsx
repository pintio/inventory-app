import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

// import Form from "../components/Form";

import PopUp from "../components/PopUp";

// interfaces
import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";
import Table from "../interfaces/table.interface";

const StockPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<InputValue>({});
  const [formData, setFormData] = useState<{ [key: string]: InputValue[] }>({});
  const [columnNames, setColumnNames] = useState<ColumnNames[]>([]);
  const [tableData, setTableData] = useState<Table[]>([]);

  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900";

  function inputHandler(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFormInput({
      label: event.currentTarget.name,
      value: event.currentTarget.value,
    });
  }

  useEffect(() => {
    axios.get("/api/get/materialsColumnNames").then((res) => {
      setColumnNames(res.data);
    });

    axios.get("api/get/allMaterials").then((res) => {
      setTableData(res.data);
    });

    const categoryData = axios.get("api/get/allCategories").then((res) => {
      return res.data;
    });

    const suppliersData = axios.get("api/get/allSuppliers").then((res) => {
      return res.data;
    });

    const warehouseData = axios.get("api/get/allWarehouses").then((res) => {
      return res.data;
    });

    const userData = axios.get("api/get/allUsers").then((res) => {
      return res.data;
    });

    Promise.all([categoryData, suppliersData, warehouseData, userData]).then(
      (values) => {
        setFormData({
          category: values[0],
          supplier: values[1],
          warehouse: values[2],
          user: values[3],
        });
      }
    );
  }, [formData]);

  return (
    <Layout>
      <div className="my-6 flex justify-between bg-slate-50">
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
          Add Material
        </button>
      </div>

      <PopUp visibility={formVisibility}>
        <div className="bg-slate-800 rounded-md border-[0.3px] w-72 text-themeWhite">
          <button
            //   onClick function to hide the parent component
            onClick={() => {
              setFormVisibility(false);
            }}
            className=" float-right text-2xl font-bold mr-4 mt-1 text-slate-200 hover:text-themeWhite"
          >
            X
          </button>

          <form
            className="px-16 py-8"
            action={`/api/add/material/${formInput.material_name}`}
            method="POST"
          >
            <label>
              Material Name
              <input
                className={formInputClass}
                type="text"
                name="material_name"
                onChange={inputHandler}
              />
            </label>
            {Object.keys(formData).length === 0 ? (
              <></>
            ) : (
              <SelectElement formData={formData} />
            )}

            <button>
              <input
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className={formInputClass}
                type="submit"
                name="item-name"
              />
            </button>
          </form>
        </div>
      </PopUp>

      <ItemTable
        columnArr={columnNames}
        tableArr={tableData}
        deleteLink={"/api/delete/category/"}
      />
    </Layout>
  );
};

const SelectElement = function ({
  formData,
}: {
  formData: { [key: string]: InputValue[] };
}) {
  function selectChange(event: React.FormEvent<HTMLSelectElement>): void {
    const value = event.currentTarget.value;
    console.log(event.currentTarget.name);
  }

  return (
    <>
      <label className=" w-full text-lg font-semibold text-white">
        Category
        <select
          onChange={selectChange}
          name="category"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          {formData.category.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800 "
                value={val.cat_id}
              >
                {val.category_name}
              </option>
            );
          })}
        </select>
      </label>
      <label className=" w-full text-lg font-semibold text-white ">
        Supplier
        <select
          name="category"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal "
        >
          {formData.supplier.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800"
                value={val.s_id}
              >
                {val.supplier_name}
              </option>
            );
          })}
        </select>
      </label>
      <label className=" w-full text-lg font-semibold text-white ">
        Category
        <select
          name="category"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          {formData.category.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800"
                value={val.cat_id}
              >
                {val.category_name}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};

export default StockPage;
