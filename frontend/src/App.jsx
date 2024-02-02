import React from "react";
import { RouterProvider } from "react-router-dom";

// Custom Routes
import router from "./Router";

// Custom Components
import PageTemplate from "./components/PageTemplate/PageTemplate";
import CustomContext from "./CustomContext/CustomContext";
import { reducer, defaultState } from "./CustomContext/reducer";

const App = () => {
  const [userState, userDispatch] = React.useReducer(reducer, defaultState);
  const stateProvider = { state: userState, dispatch: userDispatch };

  return (
    <CustomContext.Provider value={stateProvider}>
      <RouterProvider router={router} />
    </CustomContext.Provider>
  );
};

export default App;
