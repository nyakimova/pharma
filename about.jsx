import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Імпорт Link з react-router-dom
import './style.css';

function About() {
  const [cityName, setCityName] = useState('Locating...');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          const cityName = data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.county || data.address.state || data.address.country;
          setCityName(cityName);
        })
        .catch(error => {
          console.log("Error fetching city name:", error);
        });
    };

    getLocation();
  }, []);

  return (
    <div>
      <header className="header">
        <h1 className="hp"><b>PHARMA</b></h1>
        <div className="location" id="location">
          {cityName}
        </div>
      </header>
      <hr />
      <div className="image-gallery">
        <Link to="/box"> Корзина |</Link>
        <Link to="/profile"> Профіль </Link>
      </div>

      <nav className="nav">
        <Link to="/home">Головна</Link>
        <Link to="/top">Топ продажів</Link>
        <Link to="/contact">Контакти</Link>
        <Link to="/products">Товари</Link>
        <Link to="/demand">Зробити запит на пошук ліків</Link>
      </nav>
      <div className="hp">
        <h2>Про нас</h2>
        <p>PHARMA - надійний помічник у пошуках ліків у кожному куточку України!</p>
        <p>Потрібно дізнатись коротку інформацію про ліки? Ми допоможемо з цим!</p>
        <img src="src/pages/about/liky.jpg" className="image" />
      </div>
      <footer>
        <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
        <p>Copyright © 2024 PHARMA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
