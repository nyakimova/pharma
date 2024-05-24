import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './contact.css'; 

const Contact = () => {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
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
  }

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
  
    </div>

    <nav className="nav">
      <Link to="/home">Головна</Link>
      <Link to="/top">Топ продажів</Link>
      <Link to="/about">Про нас</Link>
      <Link to="/products">Товари</Link>
      <Link to="/demand">Зробити запит на пошук ліків</Link>
    </nav>
      <div className="hp">
        <h2>Контакти</h2>
        <p>Виникли проблеми чи питання? Зв'яжіться з нами:</p>
        <p>Номер телефону: +123-456-7890</p>
        <p>Ми у соціальних мережах</p>
        <p>@pharmaua</p>
      </div>
      <footer>
        <p className="warning">Самолікування може бути шкідливим для вашого здоров'я</p>
        <p>Copyright © 2024 PHARMA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
