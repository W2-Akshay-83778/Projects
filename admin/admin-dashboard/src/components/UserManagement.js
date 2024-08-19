import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './UserManagement.css';

const UserManagement = ({ isAdmin }) => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        userName: '',
        email: '',
        passwordHash: '',
        userType: ''
    });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleAddUser = () => {
        axios.post('http://localhost:8080/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({
                    userName: '',
                    email: '',
                    passwordHash: '',
                    userType: ''
                });
            })
            .catch(error => console.error('Error adding user:', error));
    };

    const handleUpdateUser = () => {
        if (editUser && editUser.id) {
            axios.put(`http://localhost:8080/users/${editUser.id}`, editUser)
                .then(response => {
                    const updatedUsers = users.map(user =>
                        user.id === editUser.id ? response.data : user
                    );
                    setUsers(updatedUsers);
                    setEditUser(null);
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            console.error('User ID is missing, cannot update user.');
        }
    };
    

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8080/users/${id}`)
            .then(() => {
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editUser) {
            setEditUser({ ...editUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <div className="user-form">
                <TextField
                    label="User Name"
                    name="userName"
                    value={editUser ? editUser.userName : newUser.userName}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={editUser ? editUser.email : newUser.email}
                    onChange={handleInputChange}
                />
                {isAdmin && (
                    <TextField
                        label="Password"
                        name="passwordHash"
                        type="password"
                        value={editUser ? editUser.passwordHash : newUser.passwordHash}
                        onChange={handleInputChange}
                        style={{ display: editUser ? 'block' : 'none' }} // Show password field only in edit mode
                    />
                )}
                <FormControl>
                    <InputLabel>UT</InputLabel>
                    <Select
                        name="userType"
                        value={editUser ? editUser.userType : newUser.userType}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="DONOR">Donor</MenuItem>
                        <MenuItem value="RECIPIENT">Recipient</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={editUser ? handleUpdateUser : handleAddUser} variant="contained">
                    {editUser ? 'Update User' : 'Add User'}
                </Button>
                {editUser && (
                    <Button onClick={() => setEditUser(null)} variant="outlined">Cancel</Button>
                )}
            </div>
            <div className="user-list">
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.userName} ({user.email}) - {user.userType}
                            {isAdmin && (
                                <>
                                    <Button onClick={() => setEditUser({ ...user })} variant="outlined">Edit</Button>
                                    <Button onClick={() => handleDeleteUser(user.id)} variant="outlined" color="error">Delete</Button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManagement;
