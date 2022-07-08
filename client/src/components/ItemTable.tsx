import React, { useEffect, useState } from "react";
import axios from "axios";

import "../style/table.css";

import ColumnNames from "../interfaces/column-names-state.interface";
import Table from "../interfaces/table.interface";
import WarehouseTable from "../interfaces/warehouse-table.interface";
import SuppliersTable from "../interfaces/supplier-table.interface";
import UsersTable from "../interfaces/user-table.interface";
import MaterialTable from "../interfaces/material-table.interface";

// tableArr -> type set to unknown temporary

function ItemTable({
  columnArr,
  tableArr,
  deleteLink,
}: {
  columnArr: ColumnNames[];
  tableArr:
    | Table[]
    | WarehouseTable[]
    | SuppliersTable[]
    | UsersTable[]
    | MaterialTable[];
  deleteLink: string;
}) {
  const [deleteId, setDeleteId] = useState<number>(NaN);

  const handleDelete = function (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const id: string = e.currentTarget.getAttribute("data-id") as string;
    setDeleteId(parseInt(id));
  };

  useEffect(() => {
    if (deleteId) {
      axios.delete(`${deleteLink}${deleteId}`);
      console.log("lololol");
    }
  }, [deleteId, deleteLink]);

  return (
    <table className="table-auto w-full text-center">
      <thead>
        <tr>
          {columnArr.map((val) => {
            return <th>{val.column_name.replace("_", " ")}</th>;
          })}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableArr.map((value, index) => {
          const val: string[] = Object.values(value);
          return (
            <tr className=" bg-slate-100 hover:bg-slate-200 transition-colors duration-300 ease-in-out">
              {val.map((v, i) => {
                return <td>{i === 0 ? index + 1 : v}</td>;
              })}
              <td className="bold text-slate-800 text-xl hover:cursor-pointer hover:bg-red-600 hover:text-slate-100 transition-colors duration-300 ease-in-out">
                <button data-id={val[0].toString()} onClick={handleDelete}>
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ItemTable;
