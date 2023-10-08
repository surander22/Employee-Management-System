import express from 'express';
import mysql from 'mysql2'; // Changed the MySQL import
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcryptjs from 'bcryptjs'; // Changed bcrypt import
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const server = express(); // Changed 'app' variable name to 'server'

server.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
server.use(cookieParser());
server.use(express.json());
server.use(express.static('public'));

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const fileUpload = multer({
    storage: fileStorage
})

dbConnection.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

server.get('/getEmployee', (req, res) => {
    const sqlQuery = "SELECT * FROM employee";
    dbConnection.query(sqlQuery, (err, result) => {
        if(err) return res.json({Error: "Get employee error in SQL"});
        return res.json({Status: "Success", Result: result})
    })
})

server.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = "SELECT * FROM employee where id = ?";
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if(err) return res.json({Error: "Get employee error in SQL"});
        return res.json({Status: "Success", Result: result})
    })
})

server.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = "UPDATE employee set salary = ? WHERE id = ?";
    dbConnection.query(sqlQuery, [req.body.salary, id], (err, result) => {
        if(err) return res.json({Error: "Update employee error in SQL"});
        return res.json({Status: "Success"})
    })
})

server.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = "DELETE FROM employee WHERE id = ?";
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if(err) return res.json({Error: "Delete employee error in SQL"});
        return res.json({Status: "Success"})
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token is wrong"});
            req.userRole = decoded.role;
            req.userId = decoded.id;
            next();
        })
    }
}

server.get('/dashboard', verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.userRole, id: req.userId})
})

server.get('/adminCount', (req, res) => {
    const sqlQuery = "SELECT COUNT(id) AS admin FROM users";
    dbConnection.query(sqlQuery, (err, result) => {
        if(err) return res.json({Error: "Error in running query"});
        return res.json(result);
    })
})

server.get('/employeeCount', (req, res) => {
    const sqlQuery = "SELECT COUNT(id) AS employee FROM employee";
    dbConnection.query(sqlQuery, (err, result) => {
        if(err) return res.json({Error: "Error in running query"});
        return res.json(result);
    })
})

server.get('/salary', (req, res) => {
    const sqlQuery = "SELECT SUM(salary) AS sumOfSalary FROM employee";
    dbConnection.query(sqlQuery, (err, result) => {
        if(err) return res.json({Error: "Error in running query"});
        return res.json(result);
    })
})

server.post('/login', (req, res) => {
    const sqlQuery = "SELECT * FROM users WHERE email = ? AND password = ?";
    dbConnection.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

server.post('/employeelogin', (req, res) => {
    const sqlQuery = "SELECT * FROM employee WHERE email = ?";
    dbConnection.query(sqlQuery, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            bcryptjs.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if(err) return res.json({Error: "Password error"});
                if(response) {
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

server.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

server.post('/create', fileUpload.single('image'), (req, res) => {
    const sqlQuery = "INSERT INTO employee (`name`,`email`,`password`, `address`, `salary`,`image`) VALUES (?)";
    bcryptjs.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename
        ]
        dbConnection.query(sqlQuery, [values], (err, result) => {
            if(err) return res
