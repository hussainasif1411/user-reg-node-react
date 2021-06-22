import { useState } from "react";
import Axios from "axios";
//import { response } from "express";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleAge(event) {
    setAge(event.target.value);
  }

  function register() {
    Axios.post("http://localhost:8000/create", {
      name: name,
      email: email,
      password: password,
      age: age,
    }).then(() => {
      console.log("Success");
      setEmployeeList([...employeeList, {
        name: name,
        email: email,
        password: password,
        age: age,
      }]);
    });
  }

  function showEmployees() {
    Axios.get("http://localhost:8000/employees").then((response) => {
      console.log(response);
      setEmployeeList(response.data);
    });
  }

  return (
    <div>
      <div>
        <label>Name:</label><br></br>
        <input type="text" onChange={handleName} placeholder="Enter your name" /><br></br>
        <label>Email:</label><br></br>
        <input type="text" onChange={handleEmail} placeholder="Enter your email" /><br></br>
        <label>Password:</label><br></br>
        <input type="text" onChange={handlePassword} placeholder="Enter your password" /><br></br>
        <label>Age:</label><br></br>
        <input type="number" onChange={handleAge} placeholder="Enter your age" /><br></br><br></br>
        <button onClick={register} >Register</button><br></br><br></br>
      </div>
      <div>
        <button onClick={showEmployees} >Show Employees</button>

        {employeeList.map((employeeData) => {
          return <div>
            <table>
              <tr>
                <td><h3>Name: {employeeData.name}</h3></td>
                <td><h3>Email: {employeeData.email}</h3></td>
                <td><h3>Age: {employeeData.age}</h3></td>
              </tr>
            </table>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
