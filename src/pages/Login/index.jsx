import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { login } from "../../rtk/slices/tasksSlice";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const linkTotask = () => {
    navigate("/Tasks");
  };
  const func = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const submitLogin = async () => {
    await dispatch(login(data)).unwrap();
    if (localStorageHelpers.get()) {
      linkTotask();
    }
  };
  return (
    <>
      <input name="email" placeholder="email" onChange={(e) => func(e)} />
      <input name="password" placeholder="password" onChange={(e) => func(e)} />
      <button onClick={submitLogin}>Submit</button>
      <Link to="/registration">Регистрация</Link>
    </>
  );
};
export default Login;
