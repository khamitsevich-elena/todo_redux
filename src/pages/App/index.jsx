import { useEffect } from "react";
import "./styles.css";
import Registration from "../Registration";
import Login from "../Login";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import PrivateRoute from "../../components/PrivateRoute";
import FilteredTodos from "../../components/FilteredTodos";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";
import { useDispatch } from "react-redux";
import { getTasks } from "../../rtk/slices/tasksSlice";

function App() {
  const navigate = useNavigate();
  const linkToMainPage = () => {
    localStorageHelpers.delete();
    navigate("/");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorageHelpers.get()) {
      dispatch(getTasks());
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={localStorageHelpers.isAuthorized() ? "/Tasks" : "/login"}
              replace
            />
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/Tasks"
            element={
              <>
                <FilteredTodos />
                <button onClick={linkToMainPage}>Выйти</button>
              </>
            }
          />
        </Route>
        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </>
  );
}
export default App;
