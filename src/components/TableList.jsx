/* eslint-disable react/prop-types */
const TableList = ({ todo, index, handleDelete, handleUpdate }) => {
  // console.log(todo);
  const { tittle, discription, option, _id } = todo;
  return (
    <tr className="bg-base-200">
      <th>{index + 1}</th>
      <td>{tittle}</td>
      <td>{discription}</td>
      <td>{option}</td>
      <td className="flex gap-5">
        <label
          onClick={() => handleUpdate(_id)}
          htmlFor="my_modal_7"
          className="btn btn-active btn-accent"
        >
          Update
        </label>
        <button onClick={() => handleDelete(_id)} className="btn btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableList;
