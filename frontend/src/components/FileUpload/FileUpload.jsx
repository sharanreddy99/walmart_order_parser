import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCustomContext } from "../../CustomContext/CustomContext";
import axios from "axios";

import {
  getCurrentOnboardingConfig,
  setCurrentOnboardingConfig,
} from "../../config/onboarding";

import { sortByKey } from "../../utils";

const FileUpload = () => {
  // States
  const { state, dispatch } = useCustomContext();

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch({ type: "SET_SELECTED_FILE", payload: file });
  };

  const handleUpload = async () => {
    if (state.selectedFile) {
      var formData = new FormData();
      formData.append("order", state.selectedFile);
      const resp = await axios.post(
        import.meta.env.VITE_WALMART_PARSER_BACKEND_URL + "/upload_order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCurrentOnboardingConfig(1, (data) => {
        dispatch({ type: "SET_ONBOARDING_DATA", payload: data });
      });

      dispatch({ type: "SET_SELECTED_FILE", payload: "" });

      dispatch({
        type: "SET_DEFAULT_GROUPS",
        payload: state.groupsList.reduce((obj, key) => {
          obj[key] = [];
          return obj;
        }, {}),
      });

      sortByKey(resp.data.ordersArr);

      dispatch({ type: "SET_ORDER_DETAILS", payload: resp.data });
    } else {
      alert("Please choose a file");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Define the allowed file types
        onChange={(e) => {
          handleFileChange(e);
        }}
        style={{ display: "none" }}
        id="file-input"
      />

      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          size="large"
          sx={{
            width: "50%",
            backgroundColor: "#002984",
            "&:hover": { backgroundColor: "#002964" },
          }}
        >
          Select Walmart Order
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!state.selectedFile}
          style={{ float: "right" }}
          size="large"
          sx={{
            width: "48%",
            backgroundColor: "#002984",
            "&:hover": { backgroundColor: "#002964" },
          }}
        >
          Upload
        </Button>
      </label>
      {state.selectedFile && (
        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
          Selected File: {state.selectedFile.name}
        </Typography>
      )}
    </Paper>
  );
};

export default FileUpload;
