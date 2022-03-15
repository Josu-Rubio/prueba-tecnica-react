import React, { useState } from 'react';
import './advert.css';

export default function Advert({ ads }) {
  const [showDesc, setShowDesc] = useState(false);
  const handleClick = () => setShowDesc(!showDesc);

  return (
    <div className='advert'>
      <div className='advertTop'>
        <h3>{ads.title}</h3>
      </div>
      <div className='advertCenter'>
        {showDesc ? <p>{ads.description}</p> : <img src={ads.image} alt='' />}
        <input
          className='advertInput'
          type='submit'
          value={showDesc ? 'Show Image' : 'Show Description'}
          onClick={handleClick}
        />
      </div>
      <div className='advertBottom'>
        <span>{ads.price} €</span>
        <span>
          <b>category:</b> <br />
          {ads.category}
        </span>
      </div>
    </div>
  );
}
