import { useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

// Custom Components
import { useCustomContext } from "../../CustomContext/CustomContext";
import GroupCreate from "../GroupCreate/GroupCreate";
import SignupComponent from "./SignupComponent";
import SignedUsersComponent from "./SignedUsersComponent";

const UserGroups = () => {
  // States
  const { state, dispatch } = useCustomContext();

  // Effects
  useEffect(() => {
    if (
      state.orderDetails.ordersArr.length == 0 &&
      Object.keys(state.orderDetails).length == 1
    ) {
      if (localStorage.getItem("users")) {
        dispatch({
          type: "SET_DEFAULT_USERS",
          payload: JSON.parse(localStorage.getItem("users")),
        });
      }

      if (localStorage.getItem("groupNames")) {
        dispatch({
          type: "SET_DEFAULT_GROUPS",
          payload: JSON.parse(localStorage.getItem("groupNames")).reduce(
            (obj, key) => {
              obj[key] = [];
              return obj;
            },
            {}
          ),
        });
      }
    }
  }, []);

  return (
    <Grid container alignItems="stretch">
      <Grid item style={{ display: "flex" }} xs={12} md={12}>
        <SignupComponent />
      </Grid>
      <Grid item style={{ display: "flex" }} xs={12} md={12}>
        <SignedUsersComponent />
      </Grid>
      <Grid item style={{ display: "flex" }} xs={12} md={12}>
        <Card
          sx={{
            margin: "1%",
            width: "100%",
            boxShadow: 3,
          }}
          key="signed_in_users"
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
              gutterBottom
            >
              Manage Groups
            </Typography>

            <GroupCreate />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserGroups;
