import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import "./Summary.css";

const Summary = ({ orderDetails, groups }) => {
  const getTotalGroupsContribution = () => {
    let totalPrice = 0;
    const groupNames = Object.keys(groups);
    for (let i = 0; i < groupNames.length; i++) {
      totalPrice += groups[groupNames[i]].reduce((a, b) => {
        return a + b["price"];
      }, 0);
    }

    return totalPrice.toFixed(4);
  };

  return (
    <Grid container alignItems="stretch">
      <Grid item style={{ display: "flex" }} xs={12} md={4}>
        <Card
          sx={{
            float: "left",
            margin: "1%",
            width: "100%",
          }}
          key={"Order Summary"}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              gutterBottom
            >
              Order Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow className="table_header">
                    <TableCell className="table_header_cell">Field</TableCell>
                    <TableCell className="table_header_cell">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row1"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      Sub Total (Excluding all taxes and fees)
                    </TableCell>
                    <TableCell>{orderDetails.subTotal || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row2"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Savings</TableCell>
                    <TableCell>-{orderDetails.savings || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row3"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Tax</TableCell>
                    <TableCell>{orderDetails.tax || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row4"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Delivery Fee</TableCell>
                    <TableCell>{orderDetails.deliveryFee || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row5"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Delivery Tip</TableCell>
                    <TableCell>{orderDetails.tip || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row6"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Order Total</TableCell>
                    <TableCell>{orderDetails.total || 0}</TableCell>
                  </TableRow>
                  <TableRow
                    className="table_body"
                    key={"table_summary_row7"}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>Split Total</TableCell>
                    <TableCell>{getTotalGroupsContribution() || 0}</TableCell>
                  </TableRow>
                  {orderDetails.total - getTotalGroupsContribution() > 0 ? (
                    <TableRow
                      className="table_body"
                      key={"table_summary_row8"}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>Remaining</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {(
                          orderDetails.total - getTotalGroupsContribution()
                        ).toFixed(4)}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      {Object.keys(groups).map((groupName) => {
        return (
          <Grid key={groupName} xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                float: "left",
                margin: "1%",
                width: "100%",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  gutterBottom
                >
                  {groupName}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="table_header">
                        <TableCell className="table_header_cell">
                          Order Name
                        </TableCell>
                        <TableCell className="table_header_cell">
                          Status
                        </TableCell>
                        <TableCell className="table_header_cell">
                          Quanitity
                        </TableCell>
                        <TableCell className="table_header_cell">
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groups[groupName].map((row) => (
                        <TableRow
                          className="table_body"
                          key={row.idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.price}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        key={groupName + ": Total"}
                        className="table_body"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="table_body_last_row">
                          Total
                        </TableCell>
                        <TableCell className="table_body_last_row">-</TableCell>
                        <TableCell className="table_body_last_row">-</TableCell>
                        <TableCell className="table_body_last_row">
                          {groups[groupName]
                            .reduce((a, b) => {
                              return a + b["price"];
                            }, 0)
                            .toFixed(4)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Summary;
