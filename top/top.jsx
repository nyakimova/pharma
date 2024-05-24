import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './top.css';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            var cityName = data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.county || data.address.state || data.address.country;
            var locationElement = document.getElementById("location");
            locationElement.innerHTML = `<img src="geo-icon.png" className="geoimage" style={{ verticalAlign: 'middle' }} /> ${cityName}`;
        })
        .catch(error => {
            console.log("Error fetching city name:", error);
        });
}

const Top = () => {
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <div className="header">
                <h1><b>PHARMA</b></h1>
                <nav className="nav">
                    <h3><Link to="/home">Головна</Link></h3>
                </nav>
            </div>
        
            <hr />
            <div className="image-gallery">
                <Link to="/box"> Корзина</Link>
            </div>

            <h1 className="hp">Топ продажів</h1>
            <img src="анальгін.jpg" />
            <br />

            <footer>
                <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
                <p>Copyright © 2024 PHARMA. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Top;
