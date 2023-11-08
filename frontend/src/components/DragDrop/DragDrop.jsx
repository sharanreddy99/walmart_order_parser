import React, { useEffect, useState } from "react";
import "./DragDrop.css";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const DragDrop = ({ groups, setGroups, orderDetails, setOrderDetails }) => {
  // useEffect
  useEffect(() => {
    const groupNames = localStorage.getItem("groupNames");
    if (groupNames) {
      const groupArr = JSON.parse(groupNames);
      const groupObj = groupArr.reduce((obj, group) => {
        obj[group] = [];
        return obj;
      }, {});

      setGroups(groupObj);
    }
  }, []);

  // handlers
  const handleOnDrag = (e, order) => {
    e.dataTransfer.setData("order", JSON.stringify(order));
  };

  const handleOnDrop = (event, groupName) => {
    const order = JSON.parse(event.dataTransfer.getData("order"));
    setGroups({ ...groups, [groupName]: [...groups[groupName], order] });

    const newOrdersArr = orderDetails.ordersArr.filter((row) => {
      return row.name !== order.name;
    });

    setOrderDetails({ ...orderDetails, ordersArr: newOrdersArr });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteGroupHandler = (groupName) => {
    let removedOrders = [...groups[groupName]];
    if (Object.keys(orderDetails).length > 0) {
      removedOrders = [...removedOrders, ...orderDetails.ordersArr];
    }

    setOrderDetails({
      ...orderDetails,
      ordersArr: removedOrders,
    });

    const newGroups = Object.keys(groups)
      .filter((key) => key !== groupName)
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {});

    setGroups(newGroups);
  };

  const deleteItemHandler = (groupName, order) => {
    setOrderDetails({
      ...orderDetails,
      ordersArr: [...orderDetails["ordersArr"], order],
    });

    const newGroupItems = groups[groupName].filter(
      (row) => row.name !== order.name
    );

    setGroups({ ...groups, [groupName]: newGroupItems });
  };

  return (
    <Container className="App" maxWidth={false}>
      <Grid container>
        <Grid xs={6} item>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            gutterBottom
          >
            Orders
          </Typography>
          <div className="widgets">
            {Object.keys(orderDetails).length > 0
              ? orderDetails.ordersArr.map((order) => {
                  return (
                    <div
                      className="widget"
                      draggable
                      onDragStart={(e) => handleOnDrag(e, order)}
                      onDrop={handleOnDrop}
                      key={order.name}
                      id={order.name}
                    >
                      {order.name}
                    </div>
                  );
                })
              : null}
          </div>{" "}
        </Grid>
        <Grid xs={6} item>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            gutterBottom
          >
            Groups
          </Typography>
          {Object.keys(groups).map((groupName) => {
            return (
              <div
                key={groupName}
                id={groupName}
                className="page"
                onDrop={(e) => {
                  handleOnDrop(e, groupName);
                }}
                onDragOver={handleDragOver}
              >
                <h4>
                  <b style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                    {groupName}
                  </b>
                  <Button
                    variant="contained"
                    color="error"
                    component="span"
                    startIcon={<ClearIcon />}
                    sx={{ float: "right" }}
                    onClick={() => {
                      deleteGroupHandler(groupName);
                    }}
                  >
                    Remove Group
                  </Button>
                </h4>
                <div style={{ float: "left", clear: "right" }}>
                  {groups[groupName].map((order, index) => {
                    return (
                      <Button
                        variant="contained"
                        component="span"
                        className="groupWidget"
                        startIcon={<ClearIcon />}
                        key={groupName + "/" + index}
                        onClick={() => {
                          deleteItemHandler(groupName, order);
                        }}
                      >
                        {order.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DragDrop;
