import React, { useEffect } from "react";
import Tools from "./components/Tools";
import { useSelector, useDispatch } from "react-redux";
import { GET_USERS } from "./store/actions";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const availabilityRawData = useSelector(
    (state) => state.rootReducer.stateUsers
  );
  const loading = useSelector((state) => state.rootReducer.loading);
  const error = useSelector((state) => state.rootReducer.error);

  useEffect(() => {
    dispatch({ type: GET_USERS });
  }, [dispatch]);

  return (
    <div>
      <Tools />
    </div>
  );
};

export default App;
