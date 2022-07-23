import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './customerManager.css';
// import 'bootstrap/dist/css/bootstrap.css';

const CustomerManager = () => {

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:5000/api/v1/user',{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            setListUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleDelete = (id) => {

        axios.delete(
            `http://127.0.0.1:5000/api/v1/user/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            alert(err.response.data.message);
        })
    }


    return ( 
        <div className="user-manager-container">
            <div className="add-user">
                <AddBoxIcon className="add-user-icon"/>
                <span>ADD USER</span>
            </div>
            <Table className="table-customer-manager">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>
                                <EditIcon className="edit-user"/>
                                <DeleteIcon className="delete-user" onClick={() => handleDelete(user.id)}/>
                            </td>
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>
      </div>
     );
}
 
export default CustomerManager;