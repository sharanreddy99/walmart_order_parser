import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";

const OnboardingWizard = ({ showModal, setShowModal, title, body }) => {
  const handleClose = () => {
    setShowModal({ ...showModal, isShown: false });
  };

  return (
    <Modal
      open={showModal}
      sx={{
        position: "absolute",
        top: "30%",
        left: "30%",
      }}
    >
      <Card sx={{ width: 500, borderRadius: "7px" }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <b>{title}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
          </Typography>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: "#002984",
              "&:hover": { backgroundColor: "#002964" },
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default OnboardingWizard;
