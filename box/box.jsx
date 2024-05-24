import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './box.css';

const Box = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch purchases data from an API or some source
        fetch('http://localhost:8000/purchase/') // Example API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch purchases');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched purchases:", data);
                if (Array.isArray(data)) {
                    setPurchases(data);
                } else if (data && Array.isArray(data.purchases)) {
                    setPurchases(data.purchases);
                } else {
                    throw new Error('Invalid data format: Expected an array');
                }
            })
            .catch(error => {
                setError(error.message);
                console.error("Error fetching purchases:", error);
            });
    }, []); // Empty dependency array to execute only once on component mount
    
    return (
        <>
            <h1 className="header"><b>PHARMA</b></h1>
            <hr />

            <nav className="nav">
                <h3><Link to="/home">Головна</Link></h3>
                <h3><Link to="/top">Топ продажів</Link></h3>
                <h3><Link to="/about">Про нас</Link></h3>
                <h3><Link to="/contact">Контакти</Link></h3>
                <h3><Link to="/demand">Зробити запит на пошук ліків</Link></h3>
            </nav>

            <div className="hp">
                <h1>ПОКУПКИ</h1>
                {error ? (
                    <p>Error: {error}</p>
                ) : purchases.length > 0 ? (
                    <ul>
                        {purchases.map((purchase, index) => (
                            <li key={index}>
                                <p><strong>Drug Name:</strong> {purchase.drug_name}</p>
                                <p><strong>Quantity:</strong> {purchase.quantity}</p>
                                <p><strong>Total:</strong> {purchase.total ? `$${purchase.total}` : 'N/A'}</p>
                                <p><strong>Date of Purchase:</strong> {new Date(purchase.date_purchase).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No purchases found.</p>
                )}
            </div>

            <footer>
                <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
                <p>Copyright © 2024 PHARMA. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Box;
