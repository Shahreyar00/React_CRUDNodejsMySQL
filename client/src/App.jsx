import React, { useState } from 'react'
import "./App.css";
import axios from "axios";

const App = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);
    
    const [newWage, setNewWage] = useState(0);
    const [employeeList, setEmployeeList] = useState([]);

    const addEmployee = () =>{
        axios.post("http://localhost:3001/create",{
            name: name, 
            age: age,
            country: country, 
            position: position,
            wage: wage,
        }).then(()=>{
            setEmployeeList([
                ...employeeList,
                {
                    name: name, 
                    age: age,
                    country: country, 
                    position: position,
                    wage: wage,
                },
            ]);
        });
    };

    const getEmployees = () =>{
        axios.get("http://localhost:3001/employees").then((response)=>{
            setEmployeeList(response.data);
        });
    };

    const updateEmployeeWage = (id) =>{
        axios.put("http://localhost:3001/update",{wage:newWage,id:id}).then(
            (response)=>{
                setEmployeeList(
                    employeeList.map((val)=>{
                        return val.id===id ? {
                            id: val.id,
                            name: val.name,
                            country: val.country,
                            age: val.age,
                            position: val.position,
                            wage: newWage,
                        } : val;
                    })
                );
            }
        );
    };

    const deleteEmployee = (id) =>{
        axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
            setEmployeeList(
                employeeList.filter((employee)=>{
                    return employee.id!=id;
                })
            );
        });
    };

    return (
        <div className="App">
            <div className="information">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <label htmlFor="age">Age:</label>
                <input 
                    type="number" 
                    onChange={(e)=>{setAge(e.target.value)}}
                />
                <label htmlFor="country">Country:</label>
                <input 
                    type="text" 
                    onChange={(e)=>{setCountry(e.target.value)}}
                />
                <label htmlFor="position">Position:</label>
                <input 
                    type="text" 
                    onChange={(e)=>{setPosition(e.target.value)}}
                />
                <label htmlFor="wage">Wage (Yearly):</label>
                <input 
                    type="number" 
                    onChange={(e)=>{setWage(e.target.value)}}
                />
                <button onClick={addEmployee}>Add Employee</button>
            </div>

            <div className="employees">
                <button onClick={getEmployees} >Show Employees</button>

                {employeeList.map((val,key)=>{
                    return(
                        <div className="employee">
                            <div>
                                <h3>Name: {val.name}</h3>
                                <h3>Age: {val.age}</h3>
                                <h3>Country: {val.country}</h3>
                                <h3>Position: {val.position}</h3>
                                <h3>Wage: {val.wage}</h3>
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="2000..."
                                    onChange={(e)=>{setNewWage(e.target.value)}}
                                />
                                <button
                                    onClick={()=>{updateEmployeeWage(val.id)}}
                                >
                                    {""}
                                    update
                                </button>

                                <button
                                    onClick={()=>{deleteEmployee(val.id)}}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default App