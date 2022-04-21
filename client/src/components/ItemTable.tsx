import React from "react";

import "../style/table.css";

function ItemTable() {
  return (
    <table className="table-auto w-full text-center">
      <thead>
        <tr>
          <th>Item</th>
          <th>updated</th>
          <th>user</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>qqqqqqq</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ItemTable;
