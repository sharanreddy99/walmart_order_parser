import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ handleUpload, handleFileChange, selectedFile }) => {
  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Define the allowed file types
        onChange={handleFileChange}
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
          disabled={!selectedFile}
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
      {selectedFile && (
        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
    </Paper>
  );
};

export default FileUpload;
