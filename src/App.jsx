import axios from "axios";
import { useEffect, useState } from "react";
import TableList from "./components/TableList";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState({});

  console.log(update);

  const [control, setControl] = useState(false);
  useEffect(() => {
    axios
      .get("https://todolish-server-jubayer1418.vercel.app/todos")
      .then((res) => {
        setTodos(res.data);
        setControl(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [control]);
  const handleAddTodo = (event) => {
    event.preventDefault();
    const form = event.target;
    const tittle = form.tittle.value;
    const discription = form.discription.value;
    const option = form.option.value;
    const todoData = {
      tittle,
      discription,
      option,
    };
    axios
      .post("https://todolish-server-jubayer1418.vercel.app/todos", {
        todoData,
      })
      .then(() => {
        setControl(false);
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = (id) => {
    axios
      .get(`https://todolish-server-jubayer1418.vercel.app/todos/${id}`)
      .then((res) => {
        setUpdate(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdatebtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const tittle = form.tittle.value;
    const discription = form.discription.value;
    const option = form.option.value;
    const todoData = {
      tittle,
      discription,
      option,
    };
    axios
      .put(
        `https://todolish-server-jubayer1418.vercel.app/todos/${update._id}`,
        {
          todoData,
        }
      )
      .then(() => {
        setControl(false);
        setUpdate(todoData);
        form.reset();
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    console.log("clio", id);
    axios
      .delete(`https://todolish-server-jubayer1418.vercel.app/todos/${id}`)
      .then(() => setControl(false))

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1 className="text-5xl font-bold uppercase text-center py-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-900">
        task management application{todos.length}
      </h1>
      <form
        onSubmit={handleAddTodo}
        className="flex gap-5 pt-10 w-[60%] mx-auto"
      >
        <input
          required
          type="text"
          name="tittle"
          placeholder="Tittle"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          required
          type="text"
          name="discription"
          placeholder="Discription"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <select
          name="option"
          required
          className="select select-info w-full max-w-xs"
        >
          <option>New</option>
          <option>In process</option>
          <option>Done</option>
        </select>
        {update ? (
          <button
            onClick={() => handleUpdatebtn(update._id)}
            className="btn btn-info"
          >
            update
          </button>
        ) : (
          <input type="submit" value={"Add todo"} className="btn btn-info" />
        )}
      </form>
      <div className="overflow-x-auto w-[80%] mx-auto my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tittle</th>
              <th>Discription</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <TableList
                index={index}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                key={todo._id}
                todo={todo}
              ></TableList>
            ))}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleUpdatebtn}
            className=" space-y-6 pt-10 w-[100%] mx-auto"
          >
            <input
              required
              type="text"
              name="tittle"
              defaultValue={update?.tittle}
              placeholder="Tittle"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              required
              type="text"
              name="discription"
              defaultValue={update?.discription}
              placeholder="Discription"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <select
              name="option"
              required
              value={update?.option}
              className="select select-info w-full max-w-xs"
            >
              <option>New</option>
              <option>In process</option>
              <option>Done</option>
            </select>

            <button htmlFor="my_modal_7" className="btn btn-info block">
              update
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="my_modal_7" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
