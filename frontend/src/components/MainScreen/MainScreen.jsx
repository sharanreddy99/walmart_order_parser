import { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "../FileUpload/FileUpload";
import DragDrop from "../DragDrop/DragDrop";
import FetchPastSplit from "../FetchPastSplit/FetchPastSplit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import {
  getCurrentOnboardingConfig,
  setCurrentOnboardingConfig,
} from "../../config/onboarding";
import OnboardingWizard from "../OnboardingWizardBox/OnboardingWizard";

import MessageTranslate from "../MessageTranslate/MessageTranslate";
import { useCustomContext } from "../../CustomContext/CustomContext";

const MainScreen = () => {
  // states
  const { state, dispatch } = useCustomContext();

  // effects
  useEffect(() => {
    if (localStorage.getItem("onboardingStep") == null) {
      setCurrentOnboardingConfig(0, (data) => {
        dispatch({ type: "SET_ONBOARDING_DATA", payload: data });
      });
    } else if (localStorage.getItem("onboardingStep") != "3") {
      setCurrentOnboardingConfig(
        parseInt(localStorage.getItem("onboardingStep")),
        (data) => {
          dispatch({ type: "SET_ONBOARDING_DATA", payload: data });
        },
        true
      );
    }
  }, []);

  useEffect(() => {
    if (state.orderDetails.ordersArr.length == 0 && state.isOrderSplitChanged) {
      postProcessedGroupWiseOrders();
    }
  }, [JSON.stringify(state.orderDetails)]);

  const postProcessedGroupWiseOrders = async () => {
    const groupNames = Object.keys(state.groups);
    let groupToIds = {};

    for (let group of groupNames) {
      const userIds = [];
      for (let temp of group.split(",")) {
        if (state.groups[temp]?.length == 0) {
          continue;
        }

        const tempUsers = state.users.filter((user) => user.name == temp);
        if (tempUsers.length == 0) {
          console.log(state.users, temp);
          alert("One of the users is not signed in. Cannot modify the order");
          throw new Error("Unable to modify");
        } else {
          userIds.push(tempUsers[0].userID);
        }
      }

      if (userIds.length == 0) {
        continue;
      }

      groupToIds[group] = userIds.join(",");
    }

    const newGroups = Object.keys(state.groups)
      .filter((group) => Object.keys(groupToIds).includes(group))
      .reduce((obj, key) => {
        obj[key] = state.groups[key];
        return obj;
      }, {});

    await axios.post(
      import.meta.env.VITE_WALMART_PARSER_BACKEND_URL +
        "/upload_processed_order",
      {
        ...newGroups,
        groupToIds: groupToIds,
        orderID: state.orderDetails.orderName,
        orderDate: state.orderDetails.date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SET_ORDERS_CHANGE_STATUS", payload: false });
  };

  return (
    <div className="root">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {getCurrentOnboardingConfig(state.onboardingData.stepNumber) != null ? (
          <OnboardingWizard />
        ) : null}
        <FetchPastSplit />
        <FileUpload />
        <MessageTranslate />
        <DragDrop />
      </LocalizationProvider>
    </div>
  );
};

export default MainScreen;
