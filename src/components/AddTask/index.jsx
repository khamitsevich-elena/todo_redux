import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTasks, filterTasks } from "../../rtk/slices/tasksSlice";

function AddTask() {
  const [task, setTask] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const { filter: filter } = useSelector((store) => store.tasks);
  const handleSubmit = async () => {
    await dispatch(createTasks(task)).unwrap();
    setTask({ title: "", description: "" });
    if (filter === `?completed=true`) {
      dispatch(filterTasks(filter));
    }
  };
  const handleChange = (e) => {
    setTask((task) => ({ ...task, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <input name="title" value={task.title} onChange={handleChange}></input>
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default AddTask;
