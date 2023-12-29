import { Button, Paper, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { setCurrentOnboardingConfig } from "../../config/onboarding";

const GroupCreate = ({ groups, setGroups, setOnboardingData }) => {
  const [name, setName] = useState("");

  const addToLocalStorage = (name) => {
    const groupArr = Object.keys(groups);
    groupArr.push(name);
    localStorage.setItem("groupNames", JSON.stringify(groupArr));
  };
  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <TextField
        sx={{ width: "50%" }}
        id="group"
        label="Group Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Comma separated names to get individual contributions"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          if (name != "") {
            setGroups({ ...groups, [name]: [] });
            setName("");
            addToLocalStorage(name);

            setCurrentOnboardingConfig(2, setOnboardingData);
          }
        }}
        size="large"
        sx={{
          float: "right",
          width: "48%",
          backgroundColor: "#002984",
          "&:hover": { backgroundColor: "#002964" },
        }}
      >
        Add Group
      </Button>
    </Paper>
  );
};

export default GroupCreate;
