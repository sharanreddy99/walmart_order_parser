import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useCustomContext } from "../../CustomContext/CustomContext";
import { ClearIcon } from "@mui/x-date-pickers";

const SignedUsersComponent = () => {
  // States
  const { state, dispatch } = useCustomContext();

  return (
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
          }}
          gutterBottom
        >
          Signed In Users
        </Typography>
        {state.users.map((user, index) => {
          return (
            <Card
              sx={{
                margin: "1%",
                width: "auto",
                float: "left",
              }}
              key={"user_card_" + index}
              onClick={() => {
                dispatch({
                  type: "TOGGLE_USER_FROM_GROUP",
                  payload: user.name,
                });
              }}
            >
              <CardContent>
                <Button
                  sx={{
                    float: "right",
                    backgroundColor: "#002984",
                    "&:hover": {
                      backgroundColor: "#000264",
                    },
                  }}
                  variant="contained"
                  component="span"
                  startIcon={<ClearIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: "REMOVE_USER",
                      payload: user,
                    });
                    dispatch({
                      type: "CLEAR_TEMP_GROUP",
                      payload: user,
                    });
                  }}
                />
              </CardContent>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  gutterBottom
                >
                  {user.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  gutterBottom
                >
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SignedUsersComponent;
