import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import UserManagement from './UserManagement'; // Import the UserManagement component

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0); // State for total donations

    // Fetch total users and donations from the API
    useEffect(() => {
        const fetchTotals = async () => {
            try {
                // Fetch total users
                const usersResponse = await axios.get('http://localhost:8080/users');
                const userCount = usersResponse.data.length;
                setTotalUsers(userCount);

                // Fetch total donations
                const donationsResponse = await axios.get('http://localhost:8080/donations');
                const donationCount = donationsResponse.data.length;
                setTotalDonations(donationCount);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTotals();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
            </div>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Users</h3>
                    <p>{totalUsers}</p>
                </div>
                <div className="card">
                    <h3>Total Donations</h3>
                    <p>{totalDonations}</p>
                </div>
            </div>
            <UserManagement /> {/* Add the UserManagement component here */}
        </div>
    );
};

export default Dashboard;
