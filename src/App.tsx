import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Lecturer from "./components/pages/lecturer";
import Login from "./components/pages/login";
import PrivateRoute from "./utils/private-route";
import LecturerDashboard from "./components/templates/lecturer-dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LecturerClasses from "./components/templates/lecturer-classes";
import LecturerNotification from "./components/templates/lecturer-notification";
import Student from "./components/pages/student";
import StudentTimeline from "./components/templates/student-timeline";
import StudentBacklog from "./components/templates/student-backlog";
import StudentTasks from "./components/templates/student-tasks";
import StudentTeam from "./components/templates/student-team";
import StudentNotification from "./components/templates/student-notification";
import StudentSetting from "./components/templates/student-setting";
import { ToastProvider } from "./utils/toast-context";
import StudentFeatureTask from "./components/organisms/student-feature-task";
import StudentVerifyRequest from "./components/organisms/student-verify-request";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route index element={<Login />} />

            <Route element={<PrivateRoute authRole={'LECTURER'} />}>
              <Route path="/lecturer" element={<Lecturer />} >
                <Route path="" element={<Navigate to="dashboard" />} />
                <Route index path="dashboard" element={<LecturerDashboard />} />
                <Route path="classes" element={<LecturerClasses />} />
                <Route path="notification" element={<LecturerNotification />} />
              </Route>
            </Route>

            <Route path="/student" element={<PrivateRoute authRole={'STUDENT'} />}>
              <Route path="/student" element={<Student />} >
                <Route path="" element={<Navigate to="timeline" />} />
                <Route path="timeline" element={<StudentTimeline />} />
                <Route path="backlog" element={<StudentBacklog />} >
                <Route path="" element={<Navigate to="featuretask" />} />
                  <Route path="featuretask" element={<StudentFeatureTask />} />
                  <Route path="verifyrequest" element={<StudentVerifyRequest />} />
                </Route>
                <Route path="tasks" element={<StudentTasks />} />
                <Route path="team" element={<StudentTeam />} />
                <Route path="notification" element={<StudentNotification />} />
                <Route path="setting" element={<StudentSetting />} />
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </GoogleOAuthProvider >
  )
}

export default App;
