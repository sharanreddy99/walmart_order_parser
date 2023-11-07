import { useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload/FileUpload";
import DragDrop from "./components/DragDrop/DragDrop";
import GroupCreate from "./components/GroupCreate/GroupCreate";
import Summary from "./components/Summary/Summary";

const App = () => {
  // states
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [groups, setGroups] = useState({});

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
        "http://localhost:5000/upload_order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGroups(
        Object.keys(groups).reduce((obj, key) => {
          obj[key] = [];
          return obj;
        }, {})
      );
      setOrderDetails(resp.data);
    } else {
      alert("Please choose a file");
    }
  };

  return (
    <div className="root">
      <FileUpload
        handleUpload={handleUpload}
        handleFileChange={handleFileChange}
        selectedFile={selectedFile}
      />

      <GroupCreate groups={groups} setGroups={setGroups} />
      <Summary groups={groups} orderDetails={orderDetails} />

      <DragDrop
        groups={groups}
        setGroups={setGroups}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
      />
    </div>
  );
};

export default App;
