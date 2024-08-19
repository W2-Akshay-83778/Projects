import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationManagement.css';

const DonationManagement = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch donations from API
        const fetchDonations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/donations');
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) return <p>Loading donations...</p>;

    return (
        <div className="donation-management">
            <h1>Donation Management</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map(donation => (
                            <tr key={donation.donationID}>
                                <td>{donation.donationID}</td>
                                <td>{donation.donationDescription}</td>
                                <td>{donation.quantity}</td>
                                <td>{donation.unit}</td>
                                <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationManagement;
