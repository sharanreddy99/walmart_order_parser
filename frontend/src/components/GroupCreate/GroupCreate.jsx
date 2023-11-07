import { Button, Paper, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const GroupCreate = ({ groups, setGroups }) => {
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
        placeholder="Enter group name for dragging the orders"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          setGroups({ ...groups, [name]: [] });
          setName("");
          addToLocalStorage(name);
        }}
        style={{ float: "right" }}
      >
        Add Group
      </Button>
    </Paper>
  );
};

export default GroupCreate;