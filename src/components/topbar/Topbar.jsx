import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './topbar.css';

export default function Topbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );
      setCategories(res.data);
    };
    getCategories();
  });

  const categoryList = [];

  for (const [i, value] of categories.entries()) {
    categoryList.push(
      <option value={value} key={i}>
        {value}
      </option>
    );
  }

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <h2>Name of the shop</h2>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <input placeholder='Search for products' className='searchInput' />
        </div>
      </div>
      <form className='topbarRight'>
        <div className='topbarCategorie'>
          <h2>Category: </h2>
          <select
            className='categories'
            id='category-selec'
            onChange={this.selectCategory}
          >
            <option value=''>None</option>
            {categoryList}
          </select>
        </div>
        <input type='submit' value='search' />
      </form>
    </div>
  );
}
