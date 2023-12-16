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

const App = () => {
  // states
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderDetails, setOrderDetails] = useState({ ordersArr: [] });
  const [groups, setGroups] = useState({});

  // effects
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

        <GroupCreate groups={groups} setGroups={setGroups} />
        <Summary groups={groups} orderDetails={orderDetails} />

        <DragDrop
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
