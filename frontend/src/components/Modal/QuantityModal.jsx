import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";

const QuantityModal = ({ modal, setModal, onSplitItem }) => {
  const { order, groupName } = modal;

  const handleClose = () => {
    setModal({ ...modal, show: false });
  };

  useEffect(() => {
    setValue(order.quantity);
  }, [JSON.stringify(order)]);

  const [value, setValue] = useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modal.show}
      onClose={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose the Quantity!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <b>{order.name}</b>
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <b>0</b>
          <Slider
            aria-label="Volume"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            step={1}
            valueLabelDisplay="auto"
            min={0}
            max={order.quantity}
            defaultValue={value}
          />
          <b>{order.quantity}</b>
        </Stack>
        <Button
          sx={{
            fontWeight: "bold",
            float: "right",
          }}
          onClick={handleClose}
          variant="contained"
        >
          Close
        </Button>
        <Button
          sx={{
            fontWeight: "bold",
            float: "right",
            marginRight: "5px",
          }}
          color="success"
          variant="contained"
          disabled={value == 0}
          onClick={() => {
            const newOrder = { ...order, quantity: value };
            onSplitItem(newOrder, groupName);
            handleClose();
          }}
        >
          Split Item
        </Button>
      </Box>
    </Modal>
  );
};
export default QuantityModal;
