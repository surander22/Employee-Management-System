import axios from 'axios';
import React, { useEffect, useState } from 'react';

function HomePage() { // Changed the component name to HomePage
  const [adminTotal, setAdminTotal] = useState(); // Changed variable names
  const [employeeTotal, setEmployeeTotal] = useState(); // Changed variable names
  const [totalSalary, setTotalSalary] = useState(); // Changed variable names

  useEffect(() => {
    axios.get('http://localhost:8081/adminCount')
      .then(response => {
        setAdminTotal(response.data[0].admin);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:8081/employeeCount')
      .then(response => {
        setEmployeeTotal(response.data[0].employee);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:8081/salary')
      .then(response => {
        setTotalSalary(response.data[0].sumOfSalary);
      })
      .catch(error => console.log(error));

  }, []);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {totalSalary}</h5>
          </div>
        </div>
      </div>

      {/* List of admin */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

