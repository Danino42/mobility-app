import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import MapAndChargers from "./pages/MapAndChargers";
import MyRoutes from "./pages/MyRoutes";
import Leaderboard from "./pages/Leaderboard";
import Preferences from "./pages/Preferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppShell />}>
          <Route index element={<MapAndChargers />} />
          <Route path="routes" element={<MyRoutes />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="preferences" element={<Preferences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;