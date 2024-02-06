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
    if (!state.isFileUploaded && !state.isSplitFetched) {
      let dispatchArr = [];

      if (localStorage.getItem("users")) {
        dispatchArr.push({
          type: "SET_DEFAULT_USERS",
          payload: JSON.parse(localStorage.getItem("users")),
        });
      }

      if (localStorage.getItem("groupNames")) {
        dispatchArr.push({
          type: "SET_DEFAULT_GROUPS",
          payload: JSON.parse(localStorage.getItem("groupNames")).reduce(
            (obj, key) => {
              obj[key] = [];
              return obj;
            },
            {}
          ),
        });
      }

      dispatch(dispatchArr);
    }

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
    if (
      (state.isSplitFetched || state.isFileUploaded) &&
      state.orderDetails.ordersArr.length == 0 &&
      state.isOrderSplitChanged
    ) {
      postProcessedGroupWiseOrders();
    }

    if (!state.isFileUploaded && !state.isSplitFetched) {
      const groupNames = localStorage.getItem("groupNames");
      if (groupNames) {
        const groupArr = JSON.parse(groupNames);
        const groupObj = groupArr.reduce((obj, group) => {
          obj[group] = [];
          return obj;
        }, {});

        dispatch({ type: "SET_DEFAULT_GROUPS", payload: groupObj });
      }
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
          dispatch({
            type: "SET_REGULAR_MODAL",
            payload: {
              isShown: true,
              title: "USER NOT SIGNED IN!!",
              body: "<b>One of the users involved in the transaction is not added / signed in. Please check and try again.</b>",
            },
          });
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
