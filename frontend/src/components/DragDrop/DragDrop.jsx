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
import QuantityModal from "../Modal/QuantityModal";
import { sortByKey } from "../../utils";

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

  const [modal, setModal] = useState({
    show: false,
    order: { name: "", quantity: 0, price: 0, status: "", perItemCost: 0 },
  });

  // handlers
  const handleOnDrag = (e, order) => {
    e.dataTransfer.setData("order", JSON.stringify(order));
  };

  const handleOnDrop = (event, groupName) => {
    const order = JSON.parse(event.dataTransfer.getData("order"));
    if (order.quantity <= 1) {
      postHandleOnDrop(order, groupName);
      return;
    }

    setModal({ ...modal, show: true, order: order, groupName: groupName });
  };

  const findUpdateOrReplace = (objArr, obj, key1, key2, operation) => {
    let foundObj = objArr.find((row) => {
      return row[key1] + row[key2] == obj[key1] + obj[key2];
    });
    if (operation == "add") {
      if (foundObj) {
        foundObj = { ...foundObj };
        foundObj.quantity += obj.quantity;
        foundObj.price = foundObj.quantity * foundObj.perItemCost;
        foundObj.price = parseFloat(foundObj.price.toFixed(4));
        let filteredObjArr = objArr.filter(
          (row) => row[key1] + row[key2] != obj[key1] + obj[key2]
        );
        filteredObjArr.push(foundObj);
        sortByKey(filteredObjArr);
        return filteredObjArr;
      }

      obj.price = obj.quantity * obj.perItemCost;
      obj.price = parseFloat(obj.price.toFixed(4));
      let newObjArr = [...objArr, { ...obj }];
      sortByKey(newObjArr);
      return newObjArr;
    } else {
      if (foundObj) {
        foundObj = { ...foundObj };
        foundObj.quantity -= obj.quantity;
        foundObj.price = foundObj.quantity * foundObj.perItemCost;
        foundObj.price = parseFloat(foundObj.price.toFixed(4));
        let filteredObjArr = objArr.filter((row) => {
          return row[key1] + row[key2] != obj[key1] + obj[key2];
        });
        if (foundObj.quantity > 0) {
          filteredObjArr.push({ ...foundObj });
        }

        sortByKey(filteredObjArr);
        return filteredObjArr;
      }
    }
  };

  const postHandleOnDrop = (order, groupName) => {
    const updatedGroups = findUpdateOrReplace(
      groups[groupName],
      order,
      "name",
      "idx",
      "add"
    );
    setGroups({ ...groups, [groupName]: updatedGroups });

    const updatedOrders = findUpdateOrReplace(
      orderDetails.ordersArr,
      order,
      "name",
      "idx",
      "subtract"
    );

    setOrderDetails({ ...orderDetails, ordersArr: updatedOrders });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteGroupHandler = (groupName) => {
    let removedOrders = [...groups[groupName]];
    let currentOrdersArr = orderDetails.ordersArr;
    if (Object.keys(orderDetails).length > 0) {
      removedOrders.forEach((obj) => {
        currentOrdersArr = findUpdateOrReplace(
          currentOrdersArr,
          obj,
          "name",
          "idx",
          "add"
        );
      });
    }

    setOrderDetails({
      ...orderDetails,
      ordersArr: currentOrdersArr,
    });

    const newGroups = Object.keys(groups)
      .filter((key) => key !== groupName)
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {});

    const groupArr = Object.keys(newGroups);
    localStorage.setItem("groupNames", JSON.stringify(groupArr));

    setGroups(newGroups);
  };

  const deleteItemHandler = (groupName, order) => {
    const updatedOrders = findUpdateOrReplace(
      orderDetails.ordersArr,
      order,
      "name",
      "idx",
      "add"
    );

    setOrderDetails({ ...orderDetails, ordersArr: updatedOrders });

    const updatedGroups = findUpdateOrReplace(
      groups[groupName],
      order,
      "name",
      "idx",
      "subtract"
    );
    setGroups({ ...groups, [groupName]: updatedGroups });
  };

  return (
    <Container className="App" maxWidth={false}>
      <QuantityModal
        modal={modal}
        setModal={setModal}
        onSplitItem={postHandleOnDrop}
      />
      <Grid container>
        {orderDetails &&
        (Object.keys(orderDetails).length == 0 ||
          (Object.keys(orderDetails).length > 0 &&
            orderDetails.ordersArr.length == 0)) ? null : (
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
                        key={order.idx}
                        id={order.idx}
                      >
                        {order.name} | Qty: {order.quantity}
                      </div>
                    );
                  })
                : null}
            </div>{" "}
          </Grid>
        )}
        <Grid
          xs={
            Object.keys(orderDetails).length == 0 ||
            (Object.keys(orderDetails).length > 0 &&
              orderDetails.ordersArr.length == 0)
              ? 12
              : 6
          }
          item
        >
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
                        {order.name} | Qty: {order.quantity}
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
