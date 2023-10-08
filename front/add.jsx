import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployeePage() { // Changed the component name to AddEmployeePage
	const [employeeData, setEmployeeData] = useState({
		name: '',
		email: '',
		password: '',
		address: '',
		salary: '',
		image: null // Changed to null to better represent an empty file input
	});
	const navigate = useNavigate();

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("name", employeeData.name);
		formData.append("email", employeeData.email);
		formData.append("password", employeeData.password);
		formData.append("address", employeeData.address);
		formData.append("salary", employeeData.salary);
		formData.append("image", employeeData.image);
		axios.post('http://localhost:8081/create', formData)
		.then(res => {
			navigate('/employee');
		})
		.catch(err => console.log(err));
	};

	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleFormSubmit}>
				<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, name: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, email: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setEmployeeData({...employeeData, password: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, salary: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setEmployeeData({...employeeData, address: e.target.value})}/>
				</div>
				<div className="col-12 mb-3">
					<label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
					<input type="file" className="form-control" id="inputGroupFile01"
					onChange={e => setEmployeeData({...employeeData, image: e.target.files[0]})}/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
	);
}

export default add;

