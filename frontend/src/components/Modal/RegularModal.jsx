import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import { useCustomContext } from "../../CustomContext/CustomContext";

const RegularModal = () => {
  // States
  const { state, dispatch } = useCustomContext();

  // Handlers
  const handleClose = () => {
    dispatch({
      type: "SET_REGULAR_MODAL",
      payload: { ...state.regularModal, isShown: false },
    });
  };

  return (
    <Modal
      open={state.regularModal.isShown}
      sx={{
        position: "absolute",
        top: "30%",
        left: "30%",
      }}
    >
      <Card sx={{ width: 500, borderRadius: "7px" }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <b>{state.regularModal.title}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div
              dangerouslySetInnerHTML={{
                __html: state.regularModal.body,
              }}
            ></div>
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

export default RegularModal;
