import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { setCurrentOnboardingConfig } from "../../config/onboarding";
import { useCustomContext } from "../../CustomContext/CustomContext";

const GroupCreate = () => {
  const { state, dispatch } = useCustomContext();

  // Handlers
  const handleAddGroup = (e) => {
    if (state.tempGroupString) {
      dispatch({ type: "ADD_GROUP", payload: state.tempGroupString });
      dispatch({ type: "CLEAR_TEMP_GROUP" });

      // TODO - nned to change onboarding handling
      // setCurrentOnboardingConfig(2, setOnboardingData);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          disabled
          sx={{ width: "50%" }}
          id="group"
          value={state.tempGroupString}
          label="Group Name"
          placeholder="Comma separated names to get individual contributions"
        />

        <Button
          variant="contained"
          className="customButton"
          onClick={(e) => {
            dispatch({ type: "CLEAR_TEMP_GROUP" });
          }}
          size="large"
          sx={{
            width: "20%",
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          className="customButton"
          onClick={(e) => {
            handleAddGroup(e);
          }}
          size="large"
          sx={{
            width: "20%",
          }}
        >
          Add Group
        </Button>
      </Box>
      <List>
        {console.log(state.groupsList)}
        {state.groupsList.map((group) => {
          return (
            <ListItem
              key={group}
              className="customButton"
              sx={{
                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <ListItemText
                sx={{
                  fontWeight: "bold",
                  textDecoration: "uppercase",
                }}
                primary={group}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default GroupCreate;
