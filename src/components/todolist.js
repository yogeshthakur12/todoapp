import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ToDoList = (props) => {
  return (
    <>
      <div id="divOne">
        <table className="tblOne">
          <tr>
            <td className="checkbox">
              <input type="checkbox" />
            </td>
            <td className="title">{props.task}</td>
            <td></td>
            <td></td>
            <td className="react-icon">
              <button className="edit">
                <FaEdit className="Faedit" />
              </button>
              <button className="delete">
                <RiDeleteBin6Line className="RiDeleteBin6Line" />
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};
