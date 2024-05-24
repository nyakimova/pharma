import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './data.css';

const Data = () => {
  const location = useLocation();
  const { list } = location.state;

  return (
    <div>
      {/* Blue bar navigation */}
      <nav className="top-bar">
        <ul>
          <li><Link to="/home">Головна</Link></li>
          <li><Link to="/demand">Зробити запит</Link></li> 
          <li><Link to="/top">Топ продажів</Link></li>
          <li><Link to="/about">Про нас</Link></li>
          <li><Link to="/contact">Контакти</Link></li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="data-container">
        <h1>Опис</h1>
        {list && list.length > 0 ? (
          <ul>
            {list.map((drug, index) => (
              <li key={index}>
                <p><strong>Назва:</strong> {drug.name}</p>
                <p><strong>Опис:</strong> {drug.description}</p>
                <p><strong>Ціна:</strong> {drug.price}</p>
                <p><strong>Доступна кількість:</strong> {drug.available_quantity}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>За пошуком не знайдено даного товару.</p>
        )}
      </div>
    </div>
  );
};

export default Data;
