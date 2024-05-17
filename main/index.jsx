import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
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
        <h1 className="hp"><b>PHARMA | головна</b></h1>
        <div className="location" id="location">
          {cityName}
        </div>
      </header>
      <hr />
      <div className="image-gallery">
         <Link to="/box">       Корзина |</Link>
        <Link to="/profile"> Профіль   </Link>
      </div>


      <div className="container">
        <div className="box">
          <h3><Link to="/top">Топ продажів</Link></h3>
        </div>
        <div className="box">
          <h3><Link to="/products">Товари</Link></h3>
        </div>
        <div className="box">
          <h3><Link to="/demand">Зробити запит на пошук ліків</Link></h3>
        </div>
      </div>

      <footer>
        <div className="footer-links">
          <Link to="/about">Про нас</Link>
          <Link to="/contact">Контакти</Link>
        </div>
        <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
        <p>Copyright © 2024 PHARMA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
