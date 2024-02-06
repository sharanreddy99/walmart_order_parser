import React, { useEffect, useState } from "react";
import "./DragDrop.css";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import QuantityModal from "../Modal/QuantityModal";
import { sortByKey } from "../../utils";
import { setCurrentOnboardingConfig } from "../../config/onboarding";
import { useCustomContext } from "../../CustomContext/CustomContext";
import RegularModal from "../Modal/RegularModal";

const DragDrop = () => {
  // States
  const { state, dispatch } = useCustomContext();
  const [modal, setModal] = useState({
    show: false,
    order: { name: "", quantity: 0, price: 0, status: "", perItemCost: 0 },
  });

  const [filterText, setFilterText] = useState("");

  // handlers
  const handleOnDrag = (e, order) => {
    e.dataTransfer.setData("order", JSON.stringify(order));
  };

  const handleOnDrop = (event, groupName) => {
    const order = JSON.parse(event.dataTransfer.getData("order"));

    const targetContainer = document.getElementById(groupName);
    const widgetButton = document.getElementById(order.idx);

    widgetButton.style.transition = "transform 0.35s ease-in-out";
    widgetButton.style.transform = `translate(${
      targetContainer.getBoundingClientRect().left -
      widgetButton.getBoundingClientRect().left
    }px, ${
      targetContainer.getBoundingClientRect().top -
      widgetButton.getBoundingClientRect().top
    }px)`;

    setTimeout(() => {
      widgetButton.style.transform = "";
      widgetButton.style.transition = "";

      if (order.quantity <= 1) {
        postHandleOnDrop(order, groupName);
        setCurrentOnboardingConfig(3, (data) =>
          dispatch({ type: "SET_ONBOARDING_DATA", payload: data })
        );
        return;
      }

      setCurrentOnboardingConfig(3, (data) =>
        dispatch({ type: "SET_ONBOARDING_DATA", payload: data })
      );
      setModal({ ...modal, show: true, order: order, groupName: groupName });
    }, 350); // 500ms = duration of the transition
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
      state.groups[groupName],
      order,
      "name",
      "idx",
      "add"
    );

    const updatedOrders = findUpdateOrReplace(
      state.orderDetails.ordersArr,
      order,
      "name",
      "idx",
      "subtract"
    );

    dispatch([
      {
        type: "SET_DEFAULT_GROUPS",
        payload: { ...state.groups, [groupName]: updatedGroups },
      },
      {
        type: "SET_ORDER_DETAILS",
        payload: { ...state.orderDetails, ordersArr: updatedOrders },
      },
      { type: "SET_ORDERS_CHANGE_STATUS", payload: true },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteGroupHandler = (groupName) => {
    let removedOrders = [...state.groups[groupName]];
    let currentOrdersArr = state.orderDetails.ordersArr;
    if (Object.keys(state.orderDetails).length > 0) {
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

    dispatch({
      type: "SET_ORDER_DETAILS",
      payload: { ...state.orderDetails, ordersArr: currentOrdersArr },
    });

    const newGroups = Object.keys(state.groups)
      .filter((key) => key !== groupName)
      .reduce((obj, key) => {
        obj[key] = state.groups[key];
        return obj;
      }, {});

    const groupArr = Object.keys(newGroups);
    localStorage.setItem("groupNames", JSON.stringify(groupArr));

    dispatch({
      type: "SET_DEFAULT_GROUPS",
      payload: newGroups,
    });
  };

  const deleteItemHandler = (groupName, order, widgetIdx) => {
    const targetContainer = document.getElementsByClassName("widgets")[0];
    const widgetButton = document.getElementById(widgetIdx);

    if (targetContainer) {
      widgetButton.style.transition = "transform 0.35s ease-in-out";
      widgetButton.style.transform = `translate(${
        targetContainer.getBoundingClientRect().left -
        widgetButton.getBoundingClientRect().left
      }px, ${
        targetContainer.getBoundingClientRect().top -
        widgetButton.getBoundingClientRect().top
      }px)`;
    }

    setTimeout(() => {
      widgetButton.style.transform = "";
      widgetButton.style.transition = "";

      const updatedOrders = findUpdateOrReplace(
        state.orderDetails.ordersArr,
        order,
        "name",
        "idx",
        "add"
      );

      dispatch({
        type: "SET_ORDER_DETAILS",
        payload: { ...state.orderDetails, ordersArr: updatedOrders },
      });

      const updatedGroups = findUpdateOrReplace(
        state.groups[groupName],
        order,
        "name",
        "idx",
        "subtract"
      );

      dispatch({
        type: "SET_DEFAULT_GROUPS",
        payload: { ...state.groups, [groupName]: updatedGroups },
      });
    }, 350); // 500ms = duration of the transition
  };

  return (
    <Container className="App" maxWidth={false}>
      <RegularModal />
      <QuantityModal
        modal={modal}
        setModal={setModal}
        onSplitItem={postHandleOnDrop}
      />
      <Grid container>
        <TextField
          sx={{ width: "50%", marginLeft: "50%" }}
          id="filterGroup"
          label="Filter Groups"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
          placeholder="Filter Groups"
        />

        {state.orderDetails &&
        (Object.keys(state.orderDetails).length == 0 ||
          (Object.keys(state.orderDetails).length > 0 &&
            state.orderDetails.ordersArr.length == 0)) ? null : (
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
              {Object.keys(state.orderDetails).length > 0
                ? state.orderDetails.ordersArr.map((order) => {
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
            </div>
          </Grid>
        )}
        <Grid
          xs={
            Object.keys(state.orderDetails).length == 0 ||
            (Object.keys(state.orderDetails).length > 0 &&
              state.orderDetails.ordersArr.length == 0)
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
          {Object.keys(state.groups)
            .filter((groupName) =>
              groupName.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((groupName) => {
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
                    <b
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
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
                    {state.groups[groupName].map((order, index) => {
                      return (
                        <Button
                          variant="contained"
                          component="span"
                          className="groupWidget"
                          startIcon={<ClearIcon />}
                          key={groupName + "/" + index}
                          id={groupName + "/" + index}
                          onClick={() => {
                            deleteItemHandler(
                              groupName,
                              order,
                              groupName + "/" + index
                            );
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
