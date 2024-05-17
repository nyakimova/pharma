import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './style.css'; 

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
            locationElement.innerHTML = `${cityName}`;
        })
        .catch(error => {
            console.log("Error fetching city name:", error);
        });
}

const Products = () => {
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <h1 className="hp"><b>PHARMA</b></h1>
            <div className="location" id="location">
                <img src="geo-icon.png" className="geoimage" style={{ verticalAlign: 'middle' }} /> Locating...
            </div>
            <hr />
            <div className="image-gallery">
                <Link to="/profile">Профіль </Link>
                <Link to="/box"> Корзина</Link>
            </div>

            <nav>
                <h3><Link to="/home">Головна</Link></h3>
                <h3><Link to="/top"> Топ продажів</Link></h3>
                <h3><Link to="/about">Про нас</Link></h3>
                <h3><Link to="/contact">Контакти</Link></h3>
                <h3><Link to="/demand">Зробити запит на пошук ліків</Link></h3>
            </nav>

            <h1 className="hp">Всі товари на сайті</h1>

            <footer>
                <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
                <p>Copyright © 2024 PHARMA. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Products;
