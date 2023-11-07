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
import LecturerClassDetail from "./components/templates/lecturer-class-detail";
import LecturerClassesManage from "./components/organisms/lecturer-classes-manage";
import LecturerClassStudentList from "./components/organisms/lecturer-class-student-list";
import { ClassInfoProvider } from "./utils/class-info-context";
import LecturerSprintStudentList from "./components/organisms/lecturer-class-sprint-list";
import LecturerClassGroupList from "./components/organisms/lecturer-class-group-list";
import Admin from "./components/pages/admin";
import AdminSemesters from "./components/templates/admin-semesters";
import StudentWelcome from "./components/pages/student-welcome";
import AdminLecturers from "./components/templates/admin-lecturer";
import AdminProject from "./components/templates/admin-projects";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ToastProvider>
          <ClassInfoProvider>
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route index element={<Login />} />

              <Route path="/admin" element={<PrivateRoute authRole={'ADMIN'} />}>
                <Route path="/admin" element={<Admin />} >
                  <Route path="" element={<Navigate to="semesters" />} />
                  <Route path="semesters" element={<AdminSemesters />} />
                  <Route path="lecturers" element={<AdminLecturers />} />
                  <Route path="projects" element={<AdminProject />} />
                </Route>
              </Route>

              <Route path="/lecturer" element={<PrivateRoute authRole={'LECTURER'} />}>
                <Route path="/lecturer" element={<Lecturer />} >
                  <Route path="" element={<Navigate to="classes" />} />
                  <Route path="classes" element={<LecturerClasses />} >
                    <Route index element={<LecturerClassesManage />} />
                    <Route path="classdetail/:classId" element={<LecturerClassDetail />} >
                      <Route path="" element={<Navigate to="studentlist" />} />
                      <Route path="sprintlist" element={<LecturerSprintStudentList />} />
                      <Route path="studentlist" element={<LecturerClassStudentList />} />
                      <Route path="grouplist" element={<LecturerClassGroupList />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="notification" element={<LecturerNotification />} />
              </Route>

              <Route path="/student" element={<PrivateRoute authRole={'STUDENT'} />}>
                <Route path="/student" element={<Student />} >
                  <Route path="" element={<Navigate to="backlog" />} />
                  {/* <Route path="timeline" element={<StudentTimeline />} /> */}
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

              <Route path="/creategroup" element={<StudentWelcome />} />
            </Routes>
          </ClassInfoProvider>
        </ToastProvider>
      </BrowserRouter>
    </GoogleOAuthProvider >
  )
}

export default App;
