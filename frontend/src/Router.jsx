import { Navigate, createBrowserRouter } from "react-router-dom";

// Custom Components
import UserGroups from "./components/UsersGroups/UsersGroups";
import MainScreen from "./components/MainScreen/MainScreen";
import PageTemplate from "./components/PageTemplate/PageTemplate";

const router = createBrowserRouter([
  {
    path: "/users_groups",
    element: (
      <PageTemplate>
        <UserGroups />
      </PageTemplate>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/order" replace={true} />,
  },
  {
    path: "/order",
    element: (
      <PageTemplate>
        <MainScreen />
      </PageTemplate>
    ),
  },
  {
    path: "/order_summary",
    element: (
      <PageTemplate>
        <h1>Summary</h1>
      </PageTemplate>
    ),
  },
  {
    path: "*",
    element: (
      <PageTemplate>
        <h1>Page Not Found</h1>
      </PageTemplate>
    ),
  },
]);

export default router;
