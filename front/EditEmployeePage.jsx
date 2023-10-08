import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployeePage() { 
	const [employeeData, setEmployeeData] = useState({
		name: '',
		email: '',
		address: '',
		salary: '',
	});
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:8081/get/${id}`)
		.then(res => {
			const employee = res.data.Result[0];
			setEmployeeData({
				...employeeData,
				name: employee.name,
				email: employee.email,
				address: employee.address,
				salary: employee.salary
			});
		})
		.catch(err => console.log(err));
	}, []);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		axios.put(`http://localhost:8081/update/${id}`, employeeData)
		.then(res => {
			if (res.data.Status === "Success") {
				navigate('/employee');
			}
		})
		.catch(err => console.log(err));
	};

	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleFormSubmit}>
				<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, name: e.target.value})} value={employeeData.name}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, email: e.target.value})} value={employeeData.email}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, salary: e.target.value})} value={employeeData.salary}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, address: e.target.value})} value={employeeData.address}/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
	);
}

export default EditEmployeePage; 

