import React, { useState } from "react";
import { Button, Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTasks, filterTasks } from "../../rtk/slices/tasksSlice";

const EditTask = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { value: todos, filter: filter } = useSelector((store) => store.tasks);
  const [editTask, setEditTask] = useState(
    todos.filter((item) => item.id == id)[0]
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(editTasks({ id: id, editTask: editTask }));
    dispatch(getTasks());
    dispatch(filterTasks(filter));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
      <Modal
        title="Edit"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Заголовок
          <input
            value={editTask.title}
            onChange={(e) =>
              setEditTask((editTask) => ({
                ...editTask,
                [e.target.name]: e.target.value,
              }))
            }
            name="title"
          />
        </p>
        <p>
          Описание
          <input
            value={editTask.description}
            onChange={(e) =>
              setEditTask((editTask) => ({
                ...editTask,
                [e.target.name]: e.target.value,
              }))
            }
            name="description"
          />
        </p>
      </Modal>
    </>
  );
};

export default EditTask;
