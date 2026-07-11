import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Todo from "../Todo";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filterTasks } from "../../rtk/slices/tasksSlice";
import AddTask from "../AddTask";
import { setFilter } from "../../rtk/slices/tasksSlice";
const FilteredTodos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter: filter } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterTasks(filter));
  }, [filter]);

  const onChange = (key) => {
    switch (key) {
      case "1":
        setSearchParams({});
        dispatch(setFilter(""));

        break;
      case "2":
        setSearchParams({ completed: true });
        dispatch(setFilter(`?completed=true`));

        break;
      case "3":
        setSearchParams({ completed: false });
        dispatch(setFilter(`?completed=false`));

        break;
    }
  };

  const items = [
    {
      key: "1",
      label: "ALL",
      children: <Todo filter={""} />,
    },
    {
      key: "2",
      label: "Checked",
      children: <Todo filter={"?completed=true"} />,
    },
    {
      key: "3",
      label: "Not Finished",
      children: <Todo filter={"?completed=false"} />,
    },
  ];
  return (
    <>
      <AddTask />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default FilteredTodos;
