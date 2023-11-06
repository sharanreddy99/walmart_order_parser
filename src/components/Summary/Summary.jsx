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
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid xs={12} item>
          {Object.keys(groups).map((groupName) => {
            return (
              <Card
                sx={{
                  float: "left",
                  margin: "1%",
                  maxWidth: 460,
                  border: "1px solid black",
                }}
                key={groupName}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {groupName}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Order Name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Quanitity</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {groups[groupName].map((row) => (
                          <TableRow
                            key={row.name}
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Total</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            {groups[groupName].reduce((a, b) => {
                              return a + b["price"];
                            }, 0)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Summary;
