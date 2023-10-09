import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// const VehicleTable = ({ data }) => {
//   console.log("Data received in VehicleTable:", data);
//   const dataArray = data ?? [];
//   return (
//     <table className="min-w-full">
//       <thead>
//         <tr>
//           <th>Plate Number</th>
//           <th>Vehicle Type</th>
//           <th>Tracker Model</th>
//           <th>Tracker Number</th>
//           <th>Mobile Number</th>
//         </tr>
//       </thead>
//       <tbody>
//         {dataArray.map((vehicle, index) => (
//           <tr key={index}>
//             <td>{vehicle.plateNumber}</td>
//             <td>{vehicle.vehicleType}</td>
//             <td>{vehicle.trackerModel}</td>
//             <td>{vehicle.trackerNumber}</td>
//             <td>{vehicle.mobileNumber}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

const VehicleTrackingScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    plateNumber: "",
    vehicleType: null,
    trackerModel: null,
    trackerNumber: "",
    mobileNumber: "",
    // icon: "default", // Default value for icon
    customIcon: null,
  });

  useEffect(() => {
    // Fetch data from the backend API to populate the table
    const fetchData = async () => {
      try {
        const apiUrl = "http://192.168.10.3:4000/getAllVehicleList"; // Update with your API endpoint
        const response = await axios.get(apiUrl);
        setVehicles(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formSubmitted]);

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send files and other form data
      const formDataToSend = new FormData();
      formDataToSend.append("plateNumber", formData.plateNumber);
      formDataToSend.append("vehicleType", formData.vehicleType);
      formDataToSend.append("trackerModel", formData.trackerModel);
      formDataToSend.append("trackerNumber", formData.trackerNumber);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      // formDataToSend.append("icon", formData.icon); // Use formData.icon directly
      formDataToSend.append("customIcon", selectedFile);

      // Make an HTTP POST request to your backend API endpoint

      const apiUrl = "http://192.168.10.3:4000/vehicalTrackingList";

      const response = await axios.post(apiUrl, formDataToSend);

      // Handle the response as needed (e.g., show a success message)
      if (response.status >= 200 && response.status < 300) {
        const MySwal = withReactContent(Swal);

        MySwal.fire(<p>Vehicle added successfully</p>);
        setFormSubmitted(true);
      } else {
        // Handle login failure
        console.log("Error");
      }

      // Reset the form after successful submission
      setFormData({
        plateNumber: "",
        vehicleType: "",
        trackerModel: "",
        trackerNumber: "",
        mobileNumber: "",
        // icon: "default",
        customIcon: null,
      });
      setSelectedFile(null);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting data:", error);
    }
  };

  const Vehicleoptions = [
    { value: "Car", label: "Car" },
    { value: "Truck", label: "Truck" },
    { value: "Motor Cycle", label: "MotorCycle" },
  ];

  const Trackeroptions = [
    { value: "BM234156", label: "BM234156" },
    { value: "AT549083", label: "AT549083" },
    { value: "YR541243", label: "YR541243" },
  ];

  return (
    <div className="xxs:w-[100%] xxxs:w-[100%] sm:h-[100vh] xxxs:h-[130vh] min-h-screen bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Tracking List
        </h2>
      </div>
      <div className="w-full space-y-3 xs:w-full">
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}

          <div className="rounded-md shadow-sm space-y-6">
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="plate-number" className="w-[0%] p-2">
                Plate Number
              </label>
              <input
                id="plate-number"
                name="plateNumber"
                type="text"
                value={formData.plateNumber}
                onChange={handleOptionChange}
                required
                className="appearance-none rounded-md block sm:w-[85%] md:w-[75%] xxxs:w-[100%] px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="vehicle-type" className="w-[50%] p-2">
                Vehicle type
              </label>
              {/* <select
                id="vehicle-type"
                name="vehicleType"
                required
                value={formData.vehicleType}
                onChange={handleOptionChange}
                className="appearance-none rounded-md block sm:w-[85%] md:w-[75%] xxs:w-[100%] px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select vehicle type</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="motorcycle">Motorcycle</option>
              </select> */}
              <Select
                className="sm:w-[85%] md:w-[75%] xxs:w-[100%]"
                name="vehicleType"
                value={
                  formData.vehicleType
                    ? {
                        value: formData.vehicleType,
                        label: formData.vehicleType,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "vehicleType")
                }
                options={Vehicleoptions}
              />
            </div>
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="tracker-model" className="w-[50%] p-2">
                Tracker model
              </label>
              {/* <select
                id="tracker-model"
                name="trackerModel"
                required
                value={formData.trackerModel}
                onChange={handleOptionChange}
                className="appearance-none rounded-md block sm:w-[85%] md:w-[75%] xxxs:w-[100%] px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select tracker model</option>
                <option value="BM321689">BM321689</option>
                <option value="BZ421649">BZ421649</option>
              </select> */}
              <Select
                className="sm:w-[85%] md:w-[75%] xxs:w-[100%]"
                name="trackerModel"
                value={
                  formData.trackerModel
                    ? {
                        value: formData.trackerModel,
                        label: formData.trackerModel,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "trackerModel")
                }
                options={Trackeroptions}
              />
            </div>
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="trackernumber" className="w-[50%] p-2">
                Tracker number
              </label>
              <input
                id="tracker-number"
                name="trackerNumber"
                type="text"
                required
                value={formData.trackerNumber}
                onChange={handleOptionChange}
                className="appearance-none rounded-md block sm:w-[85%] md:w-[75%] xxxs:w-[100%] px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="mobile-number" className="w-[50%] p-2">
                Mobile Number
              </label>
              <input
                id="mobile-number"
                name="mobileNumber"
                type="text"
                required
                value={formData.mobileNumber}
                onChange={handleOptionChange}
                className="appearance-none rounded-md block sm:w-[85%] md:w-[75%] xxxs:w-[100%] px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="sm:inline-block xxs:block sm:w-[50%]">
              <label htmlFor="icon" className="w-[50%] p-2 pr-10">
                Icon
              </label>
              <div className="flex items-center space-x-2">
                <select
                  id="icon"
                  name="icon"
                  className="appearance-none rounded-md sm:w-[85%] md:w-[75%] xxxs:w-[100%] px-2 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleOptionChange}
                  value={formData.icon}
                >
                  <option value="default">Default Icon</option>
                  <option value="custom">Custom Icon</option>
                </select>
                {formData.icon === "custom" && !selectedFile && (
                  <>
                    <label
                      htmlFor="custom-icon"
                      className="cursor-pointer text-indigo-500"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id="custom-icon"
                      name="customIcon"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
                {selectedFile && formData.icon === "custom" && (
                  <div className="mt-2 text-indigo-500">Image Uploaded!</div>
                )}
                {formData.icon === "custom" && selectedFile && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Custom Icon Preview"
                      className="max-w-[50px] max-h-[50px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-40 px-5 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <table className="min-w-full mt-16">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Vehicle Type</th>
            <th>Tracker Model</th>
            <th>Tracker Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className="text-center">{vehicle.plateNumber}</td>
              <td className="text-center">{vehicle.vehicleType}</td>
              <td className="text-center">{vehicle.trackerModel}</td>
              <td className="text-center">{vehicle.trackerNumber}</td>
              <td className="text-center">
                {vehicle.status === "true" ? (
                  <button className="text-green-600">Active</button>
                ) : (
                  <button className="text-red-600">Deactive</button>
                )}
              </td>
              <td className="text-center">Nil</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTrackingScreen;
