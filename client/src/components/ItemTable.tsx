import React from "react";

import "../style/table.css";

import ColumnNames from "../interfaces/column-names-state.interface";
import Table from "../interfaces/table.interface";

// tableArr -> type set to unknown temporary

function ItemTable({
  columnArr,
  tableArr,
}: {
  columnArr: ColumnNames[];
  tableArr: Table[];
}) {
  return (
    <table className="table-auto w-full text-center">
      <thead>
        <tr>
          {columnArr.map((val) => {
            return <th>{val.column_name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableArr.map((value) => {
          const val: string[] = Object.values(value);
          return (
            <tr>
              {val.map((v) => {
                return <td>{v}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    // <table className="table-auto w-full text-center">
    //   <thead>
    //     <tr>
    //       <th>Item</th>
    //       <th>updated</th>
    //       <th>user</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>qqqqqqq</td>
    //       <td>Malcolm Lockyer</td>
    //       <td>1961</td>
    //     </tr>
    //     <tr>
    //       <td>Witchy Woman</td>
    //       <td>The Eagles</td>
    //       <td>1972</td>
    //     </tr>
    //     <tr>
    //       <td>Shining Star</td>
    //       <td>Earth, Wind, and Fire</td>
    //       <td>1975</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}

export default ItemTable;
