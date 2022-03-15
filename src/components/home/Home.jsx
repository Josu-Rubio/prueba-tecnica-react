import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../topbar/Topbar';
import Footer from '../footer/Footer';
import Advert from '../advert/Advert';
import './home.css';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');

  useEffect((query) => {
    const fetchAds = async () => {
      const res = await axios.get(
        query
          ? `https://fakestoreapi.com/products/category/${query}`
          : `https://fakestoreapi.com/products/`
      );
      setAds(res.data);
    };
    fetchAds();
  });

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );
      setCategories(res.data);
    };
    getCategories();
  });

  const menuItems = [...new Set(ads.map((ads) => ads.category))];
  console.log((ads) => ads.category);

  const categoryList = [];

  for (const [i, value] of categories.entries()) {
    categoryList.push(
      <option value={value} key={i}>
        {value}
      </option>
    );
  }

  const categoryChange = () => {
    setQuery(categories);
  };

  return (
    <>
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
              onChange={(e) => setQuery(e.target.value)}
            >
              <option value=''>None</option>
              {categoryList}
            </select>
          </div>
          <input type='submit' value='search' />
        </form>
      </div>
      <div className='main'>
        {ads.map((a) => (
          <Advert key={a._id} ads={a} />
        ))}
      </div>
      <Footer />
    </>
  );
}
