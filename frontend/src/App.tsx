import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FleetDashboard from "./pages/FleetDashboard";
import DriverView from "./pages/DriverView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<FleetDashboard />} />
          <Route path="driver" element={<DriverView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
