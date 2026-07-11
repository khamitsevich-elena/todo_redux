import EditTask from "../EditTask";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  doneTasks,
  filterTasks,
} from "../../rtk/slices/tasksSlice";

const Todo = () => {
  const dispatch = useDispatch();
  const { value: todos, filter: filter } = useSelector((store) => store.tasks);
  const handleDone = async (id, e) => {
    await dispatch(doneTasks({ id: id, e: e })).unwrap();
    if (filter == `?completed=true` || filter == `?completed=false`) {
      dispatch(filterTasks(filter));
    }
  };
  return todos.length != 0 ? (
    <>
      {
        <div>
          {todos.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => handleDone(item.id, e)}
              ></input>
              <p>{item.title}</p>
              <span>{item.description}</span>
              <br></br>
              <button onClick={() => dispatch(deleteTask(item.id))}>🗑</button>

              <EditTask id={item.id} />
              <hr />
            </li>
          ))}
        </div>
      }
    </>
  ) : (
    <span>List is EMPTY</span>
  );
};

export default Todo;
