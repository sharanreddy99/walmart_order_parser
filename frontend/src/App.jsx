import { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload/FileUpload";
import DragDrop from "./components/DragDrop/DragDrop";
import GroupCreate from "./components/GroupCreate/GroupCreate";
import Summary from "./components/Summary/Summary";
import FetchPastSplit from "./components/FetchPastSplit/FetchPastSplit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { sortByKey } from "./utils";
import OnboardingWizard from "./components/OnboardingWizardBox/OnboardingWizard";
import {
  getCurrentOnboardingConfig,
  setCurrentOnboardingConfig,
} from "./config/onboarding";
import { TextField } from "@mui/material";
import MessageTranslate from "./components/MessageTranslate/MessageTranslate";

const App = () => {
  // states
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderDetails, setOrderDetails] = useState({ ordersArr: [] });
  const [groups, setGroups] = useState({});
  const [onboardingData, setOnboardingData] = useState({
    data: null,
    stepNumber: 0,
    isShown: false,
  });

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

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      var formData = new FormData();
      formData.append("order", selectedFile);
      const resp = await axios.post(
        import.meta.env.VITE_WALMART_PARSER_BACKEND_URL + "/upload_order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCurrentOnboardingConfig(1, setOnboardingData);

      setSelectedFile("");

      setGroups(
        Object.keys(groups).reduce((obj, key) => {
          obj[key] = [];
          return obj;
        }, {})
      );

      sortByKey(resp.data.ordersArr);
      setOrderDetails(resp.data);
    } else {
      alert("Please choose a file");
    }
  };

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
        <FetchPastSplit
          setGroups={setGroups}
          setOrderDetails={setOrderDetails}
        />

        <FileUpload
          handleUpload={handleUpload}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          key={selectedFile}
        />

        <GroupCreate
          groups={groups}
          setGroups={setGroups}
          setOnboardingData={setOnboardingData}
        />
        <Summary groups={groups} orderDetails={orderDetails} />

        <DragDrop
          groups={groups}
          setGroups={setGroups}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
          setCurrentOnboardingConfig={setCurrentOnboardingConfig}
          setOnboardingData={setOnboardingData}
        />

        <MessageTranslate
          groups={groups}
          setGroups={setGroups}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      </LocalizationProvider>
    </div>
  );
};

export default App;
