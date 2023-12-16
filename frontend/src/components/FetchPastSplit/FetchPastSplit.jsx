import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const FetchPastSplit = ({ setOrderDetails, setGroups }) => {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(moment());

  // Handlers
  const fetchPastProcessedOrder = () => {};

  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <TextField
        sx={{ width: "33%" }}
        id="orderID"
        label="Order ID"
        value={orderId}
        onChange={(e) => {
          setOrderId(e.target.value);
        }}
        placeholder="Walmart Order ID"
      />

      <DatePicker
        sx={{ width: "33%", marginLeft: "1%" }}
        label="Order Date"
        value={orderDate}
        onChange={(newValue) => setOrderDate(newValue)}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={!(orderId != "" && orderDate != "")}
        onClick={fetchPastProcessedOrder}
        size="large"
        sx={{
          float: "right",
          width: "30%",
          backgroundColor: "#002984",
          "&:hover": { backgroundColor: "#002964" },
        }}
      >
        Fetch Processed Order
      </Button>
    </Paper>
  );
};

export default FetchPastSplit;
