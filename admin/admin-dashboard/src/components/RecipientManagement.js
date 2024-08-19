import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipientManagement.css';

const RecipientManagement = () => {
    const [recipients, setRecipients] = useState([]);
    const [newRecipient, setNewRecipient] = useState({
        userID: '',
        donationID: '',
        quantityReceived: ''
    });
    const [editRecipient, setEditRecipient] = useState(null);
    const [users, setUsers] = useState([]);
    const [donations, setDonations] = useState([]);
    const [showRecipients, setShowRecipients] = useState(false); // Added state to control visibility

    useEffect(() => {
        // Fetch recipients from API
        axios.get('http://localhost:8080/recipients')
            .then(response => {
                setRecipients(response.data);
            })
            .catch(error => console.error('Error fetching recipients:', error));

        // Fetch users and donations from API for selection
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));

        axios.get('http://localhost:8080/donations')
            .then(response => {
                setDonations(response.data);
            })
            .catch(error => console.error('Error fetching donations:', error));
    }, []);

    const handleAddRecipient = () => {
        axios.post('http://localhost:8080/recipients', newRecipient)
            .then(response => {
                setRecipients([...recipients, response.data]);
                setNewRecipient({
                    userID: '',
                    donationID: '',
                    quantityReceived: ''
                });
                setShowRecipients(true); // Show recipients list after adding a new recipient
            })
            .catch(error => console.error('Error adding recipient:', error));
    };

    const handleUpdateRecipient = () => {
        axios.put(`http://localhost:8080/recipients/${editRecipient.id}`, editRecipient)
            .then(response => {
                const updatedRecipients = recipients.map(recipient =>
                    recipient.id === editRecipient.id ? response.data : recipient
                );
                setRecipients(updatedRecipients);
                setEditRecipient(null);
            })
            .catch(error => console.error('Error updating recipient:', error));
    };

    const handleDeleteRecipient = (id) => {
        axios.delete(`http://localhost:8080/recipients/${id}`)
            .then(() => {
                const updatedRecipients = recipients.filter(recipient => recipient.id !== id);
                setRecipients(updatedRecipients);
            })
            .catch(error => console.error('Error deleting recipient:', error));
    };

    return (
        <div className="recipient-management">
            <h1>Recipient Management</h1>
            <div className="recipient-form">
                <h2>{editRecipient ? 'Edit Recipient' : 'Add New Recipient'}</h2>
                <select
                    value={editRecipient ? editRecipient.userID : newRecipient.userID}
                    onChange={e => {
                        const value = e.target.value;
                        if (editRecipient) {
                            setEditRecipient({ ...editRecipient, userID: value });
                        } else {
                            setNewRecipient({ ...newRecipient, userID: value });
                        }
                    }}
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.userID} value={user.userID}>
                            {user.userName}
                        </option>
                    ))}
                </select>
                <select
                    value={editRecipient ? editRecipient.donationID : newRecipient.donationID}
                    onChange={e => {
                        const value = e.target.value;
                        if (editRecipient) {
                            setEditRecipient({ ...editRecipient, donationID: value });
                        } else {
                            setNewRecipient({ ...newRecipient, donationID: value });
                        }
                    }}
                >
                    <option value="">Select Donation</option>
                    {donations.map(donation => (
                        <option key={donation.donationID} value={donation.donationID}>
                            {donation.donationDescription}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={editRecipient ? editRecipient.quantityReceived : newRecipient.quantityReceived}
                    onChange={e => {
                        const value = e.target.value;
                        if (editRecipient) {
                            setEditRecipient({ ...editRecipient, quantityReceived: value });
                        } else {
                            setNewRecipient({ ...newRecipient, quantityReceived: value });
                        }
                    }}
                    placeholder="Quantity Received"
                />
                {editRecipient ? (
                    <>
                        <button onClick={handleUpdateRecipient}>Update Recipient</button>
                        <button onClick={() => setEditRecipient(null)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={handleAddRecipient}>Add Recipient</button>
                )}
            </div>
            <button onClick={() => setShowRecipients(!showRecipients)}>
                {showRecipients ? 'Hide Recipients' : 'Show Recipients'}
            </button>
            {showRecipients && (
                <ul>
                    {recipients.map(recipient => (
                        <li key={recipient.id}>
                            Quantity Received: {recipient.quantityReceived}
                            <button onClick={() => setEditRecipient({
                                id: recipient.id,
                                userID: recipient.userID,
                                donationID: recipient.donationID,
                                quantityReceived: recipient.quantityReceived
                            })}>Edit</button>
                            <button onClick={() => handleDeleteRecipient(recipient.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipientManagement;
