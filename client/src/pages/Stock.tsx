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

  useEffect(() => {
    axios.get("/api/get/materialsColumnNames").then((res) => {
      setColumnNames(res.data);
    });

    axios.get("/api/get/allMaterials").then((res) => {
      let data = res.data;
      data.received_by = setTableData(res.data);
      console.log(res.data, "materialData");
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

    Promise.all([categoryData, suppliersData, warehouseData, userData])
      .then((values) => {
        setFormData({
          category: values[0],
          supplier: values[1],
          warehouse: values[2],
          user: values[3],
        });
      })
      .then(() => console.log(formData));

    console.log(formInput);
  }, [formInput]);

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
        <div className="bg-slate-800 rounded-md border-[0.3px] w-96 text-themeWhite">
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
            action={`/api/add/material/${formInput.material}&${formInput.category}&${formInput.warehouse}&${formInput.supplier}&${formInput.user}`}
            method="POST"
          >
            {Object.keys(formData).length === 0 ? (
              <></>
            ) : (
              <FormOptions
                formData={formData}
                setFormInputValues={setFormInput}
                formInputValues={formInput}
              />
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
        deleteLink={"/api/delete/material/"}
      />
    </Layout>
  );
};

const FormOptions = function ({
  formData,
  setFormInputValues,
  formInputValues,
}: {
  formData: { [key: string]: InputValue[] };
  setFormInputValues: (value: React.SetStateAction<InputValue>) => void;
  formInputValues: InputValue;
}) {
  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900";

  const [formIn, setFormIn] = useState<{ [key: string]: string }>({});

  function selectChange(
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ): void {
    const value = event.currentTarget.value;
    const label = event.currentTarget.name;

    setFormIn({ label: label, value: value });
  }

  useEffect(() => {
    let data = { ...formInputValues };

    data[formIn.label] = formIn.value;

    setFormInputValues(data);
  }, [formIn]);

  return (
    <>
      <label className="w-full">
        Material Name
        <input
          onChange={selectChange}
          className={formInputClass}
          type="text"
          name="material"
        />
      </label>
      <label className=" w-full text-lg font-semibold text-white">
        Category
        <select
          onChange={selectChange}
          name="category"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          <option disabled selected hidden>
            select an option
          </option>
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
          onChange={selectChange}
          name="supplier"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal w-full"
        >
          <option disabled selected hidden>
            select an option
          </option>
          {formData.supplier.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800 w-full"
                value={val.s_id}
              >
                {val.supplier_name}
              </option>
            );
          })}
        </select>
      </label>
      <label className=" w-full text-lg font-semibold text-white ">
        Warehouse
        <select
          onChange={selectChange}
          name="warehouse"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          <option disabled selected hidden>
            select an option
          </option>
          {formData.warehouse.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800"
                value={val.w_id}
              >
                {val.warehouse_name}
              </option>
            );
          })}
        </select>
      </label>
      <label className=" w-full text-lg font-semibold text-white ">
        Receiver
        <select
          onChange={selectChange}
          name="user"
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          <option disabled selected hidden>
            select an option
          </option>
          {formData.user.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800"
                value={val.user_id}
              >
                {val.full_name}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};

export default StockPage;
