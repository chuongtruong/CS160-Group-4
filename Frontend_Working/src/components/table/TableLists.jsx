import React, { useState } from "react";
import { TableList } from "./TableList";
import { orders } from "../../data2";

export const TableLists = ({ isEmpty, setIsDetail, setOrderList }) => {
  const [occupied, setOccupied] = useState(orders);
  const [empty, setEmpty] = useState(["1", "2", "3", "4", "5", "6"]);

  return (
    <div className="table-bottom">
      <span className="table-name">{isEmpty}</span>
      <div className="table-list">
        {isEmpty === "empty"
          ? empty.map((number) => (
              <TableList
                name={isEmpty}
                number={number}
                setIsDetail={setIsDetail}
              />
            ))
          : occupied.map((order) => (
              <TableList
                key={order.table}
                name={isEmpty}
                number={order.table}
                setIsDetail={setIsDetail}
                setOrderList={setOrderList}
                orderList={order}
              />
            ))}
      </div>
    </div>
  );
};
