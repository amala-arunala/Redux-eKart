import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      history.push("./");
    }
  }, [history]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
