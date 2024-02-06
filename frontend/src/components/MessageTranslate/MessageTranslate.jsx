import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { sortByKey } from "../../utils";
import { useCustomContext } from "../../CustomContext/CustomContext";

const MessageTranslate = () => {
  const { state, dispatch } = useCustomContext();
  const [orderText, setOrderText] = useState("");

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

  const postHandleOnDrop = (orders, groupName) => {
    const targetContainer = document.getElementById(groupName);
    let updatedGroups = { ...state.groups };
    let widgetButtons = [];

    orders.forEach((order) => {
      const temp = findUpdateOrReplace(
        updatedGroups[groupName],
        order,
        "name",
        "idx",
        "add"
      );

      updatedGroups = { ...updatedGroups, [groupName]: temp };
      const widgetButton = document.getElementById(order.idx);
      widgetButtons.push(widgetButton);

      if (targetContainer) {
        widgetButton.style.transition = "transform 1s ease-in-out";
        widgetButton.style.transform = `translate(${
          targetContainer.getBoundingClientRect().left -
          widgetButton.getBoundingClientRect().left
        }px, ${
          targetContainer.getBoundingClientRect().top -
          widgetButton.getBoundingClientRect().top
        }px)`;
      }
    });

    let updatedOrders = { ...state.orderDetails };
    orders.forEach((order) => {
      const temp = findUpdateOrReplace(
        updatedOrders.ordersArr,
        order,
        "name",
        "idx",
        "subtract"
      );

      updatedOrders = { ...updatedOrders, ordersArr: temp };
    });

    setTimeout(() => {
      widgetButtons.forEach((widgetButton) => {
        widgetButton.style.transform = "";
        widgetButton.style.transition = "";
      });

      dispatch([
        { type: "SET_DEFAULT_GROUPS", payload: updatedGroups },
        { type: "SET_ORDER_DETAILS", payload: updatedOrders },
        { type: "SET_ORDERS_CHANGE_STATUS", payload: true },
      ]);
    }, 1000);
  };

  const handlePassedText = () => {
    const textArr = orderText.split("ordered by");
    if (textArr.length == 2 && state.groups[textArr[1].replace(/\s+/g, "")]) {
      const groupName = textArr[1].replace(/\s+/g, "").toLowerCase();
      if (textArr[0].replace(/\s+/g, "").toLocaleLowerCase() == "all") {
        postHandleOnDrop(state.orderDetails.ordersArr, groupName);
      } else {
        const currItems = textArr[0].trim().toLowerCase().split(";;");

        const newOrders = state.orderDetails.ordersArr.filter((order) => {
          for (let i = 0; i < currItems.length; i++) {
            if (order.name.toLowerCase().includes(currItems[i].toLowerCase())) {
              return true;
            }
          }
          return false;
        });

        postHandleOnDrop(newOrders, groupName);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: "10px" }}>
      <TextField
        sx={{ width: "85%" }}
        id="ordertext"
        label="Assign Items to Groups"
        value={orderText}
        onChange={(e) => {
          setOrderText(e.target.value);
        }}
        placeholder="Use the following pattern '<order1_substr;;order2_substr... | all> ordered by <group_name>'"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          handlePassedText();
        }}
        size="large"
        sx={{
          float: "right",
          width: "13%",
          backgroundColor: "#002984",
          "&:hover": { backgroundColor: "#002964" },
        }}
      >
        Assign Items
      </Button>
    </Paper>
  );
};

export default MessageTranslate;
