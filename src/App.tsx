import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lecturer from "./components/pages/lecturer";
import Login from "./components/pages/login";
import PrivateRoute from "./utils/private-routes";
import LecturerDashboard from "./components/templates/lecturer-dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/lecturer" element={<PrivateRoute authRole={'LECTURER'} />}>
            <Route path="/lecturer" element={<Lecturer />} >
              <Route path="dashboard" element={<LecturerDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider >
  )
}

export default App;
