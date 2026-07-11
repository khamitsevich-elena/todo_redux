import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { registration } from "../../rtk/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";
import { deleteErrors } from "../../rtk/slices/userSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.tasks.errors);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const linkToEnter = () => {
    navigate("/login");
  };

  const func = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const submitRegistration = async () => {
    await dispatch(registration(data)).unwrap();
    if (localStorageHelpers.get()) {
      linkToEnter();
    }
  };

  return (
    <>
      <input name="username" placeholder="name" onChange={(e) => func(e)} />
      <input name="email" placeholder="email" onChange={(e) => func(e)} />
      <input name="password" placeholder="password" onChange={(e) => func(e)} />
      <button onClick={submitRegistration}>Submit</button>
      <div style={{ color: "red" }}>
        {errors && errors.map((item) => <p>{item}</p>)}
      </div>

      <Link to="/login" onClick={dispatch(deleteErrors())}>
        Залогиниться
      </Link>
    </>
  );
};

export default Registration;
