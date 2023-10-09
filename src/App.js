import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginScreen from "./screens/LoginScreen";
import GoogleMapScreen from "./screens/GoogleMapScreen";
import LeafletMapScreen from "./screens/LeafletMapScreen";
import InformationManagementScreen from "./screens/InformationManagementScreen";
import VehicleTrackingScreen from "./screens/VehicleTrackingScreen";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/googlemap" exact element={<GoogleMapScreen />} />
          <Route path="/leafletmap" exact element={<LeafletMapScreen />} />
          <Route
            path="/informationmanagement"
            exact
            element={<InformationManagementScreen />}
          />
          <Route
            path="vehicletracking"
            exact
            element={<VehicleTrackingScreen />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
