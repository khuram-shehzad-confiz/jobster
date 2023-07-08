import Landing from "./pages/Landing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SharedLayout from "./pages/dashboard/SharedLayout";
import { Stats } from "./pages/dashboard/Stats";
import AllJobs from "./pages/dashboard/AllJobs";
import AddJob from "./pages/dashboard/AddJob";
import Profile from "./pages/dashboard/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Error from "./pages/Error";


function App() {
  return (
    <BrowserRouter>
       <ToastContainer position="top-center"/>
      <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>
      }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      <Route path="landing" element={<Landing />} />
      <Route path="register" element={<Register/>}/>
      <Route path="*" element={<Error/>}/>
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
