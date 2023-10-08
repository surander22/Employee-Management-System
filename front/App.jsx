import React from 'react';
import LoginPage from './LoginPage'; // Changed the import and component name
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage'; // Changed the import and component name
import EmployeePage from './EmployeePage'; // Changed the import and component name
import ProfilePage from './ProfilePage'; // Changed the import and component name
import HomePage from './HomePage'; // Changed the import and component name
import AddEmployeePage from './AddEmployeePage'; // Changed the import and component name
import EditEmployeePage from './EditEmployeePage'; // Changed the import and component name
import StartPage from './StartPage'; // Changed the import and component name
import EmployeeDetailPage from './EmployeeDetailPage'; // Changed the import and component name
import EmployeeLoginPage from './EmployeeLoginPage'; // Changed the import and component name

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/employee" element={<EmployeePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create" element={<AddEmployeePage />}></Route>
          <Route path="/employeeEdit/:id" element={<EditEmployeePage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/start" element={<StartPage />}></Route>
        <Route path="/employeeLogin" element={<EmployeeLoginPage />}></Route>
        <Route path="/employeedetail/:id" element={<EmployeeDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

