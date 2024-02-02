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
  const { onboardingData, selectedFile, orderDetails, groups } = state;

  // Temporary Handlers
  const setOnboardingData = (data) => {
    dispatch({ type: "SET_ONBOARDING_DATA", payload: data });
  };

  const setSelectedFile = (data) => {
    dispatch({ type: "SET_SELECTED_FILE", payload: data });
  };

  const setGroups = (data) => {
    dispatch({ type: "SET_DEFAULT_GROUPS", payload: data });
  };

  const setOrderDetails = (data) => {
    dispatch({ type: "SET_ORDER_DETAILS", payload: data });
  };

  // effects
  useEffect(() => {
    if (localStorage.getItem("onboardingStep") == null) {
      setCurrentOnboardingConfig(0, setOnboardingData);
    } else if (localStorage.getItem("onboardingStep") != "3") {
      setCurrentOnboardingConfig(
        parseInt(localStorage.getItem("onboardingStep")),
        setOnboardingData,
        true
      );
    }
  }, []);

  useEffect(() => {
    if (orderDetails.ordersArr.length == 0) {
      postProcessedGroupWiseOrders();
    }
  }, [JSON.stringify(orderDetails)]);

  const postProcessedGroupWiseOrders = async () => {
    await axios.post(
      import.meta.env.VITE_WALMART_PARSER_BACKEND_URL +
        "/upload_processed_order",
      {
        ...groups,
        orderID: orderDetails.orderName,
        orderDate: orderDetails.date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="root">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {getCurrentOnboardingConfig(onboardingData.stepNumber) != null ? (
          <OnboardingWizard
            showModal={onboardingData.isShown}
            setShowModal={setOnboardingData}
            {...onboardingData.data}
          />
        ) : null}
        <FetchPastSplit />
        <FileUpload />
        <MessageTranslate
          groups={groups}
          setGroups={setGroups}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
        <DragDrop
          groups={groups}
          setGroups={setGroups}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
          setCurrentOnboardingConfig={setCurrentOnboardingConfig}
          setOnboardingData={setOnboardingData}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MainScreen;
