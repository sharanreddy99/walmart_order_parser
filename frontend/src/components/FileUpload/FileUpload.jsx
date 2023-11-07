import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ handleUpload, handleFileChange, selectedFile }) => {
  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Upload Document
      </Typography>
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
        >
          Select File
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
          style={{ float: "right" }}
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
