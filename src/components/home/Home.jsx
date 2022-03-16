import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Topbar from '../topbar/Topbar';
import Footer from '../footer/Footer';
import Advert from '../advert/Advert';
import './home.css';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

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

  const categoryList = [];

  for (const [i, value] of categories.entries()) {
    categoryList.push(
      <option value={value} key={i}>
        {value}
      </option>
    );
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getFilteredList = () => {
    if (!selectedCategory) {
      return ads;
    }
    return ads.filter((item) => item.category === selectedCategory);
  };

  const filteredList = useMemo(getFilteredList, [selectedCategory, ads]);

  return (
    <>
      <div className='topbarContainer'>
        <div className='topbarLeft'>
          <h2>Virtual Shop</h2>
        </div>
        <div className='topbarCenter'>
          <div className='searchbar'>
            {/* Work in progress */}
            <input placeholder='Search for products' className='searchInput' />
          </div>
        </div>
        <form className='topbarRight'>
          <div className='topbarCategorie'>
            <h2>Category: </h2>
            <select
              className='categories'
              id='category-selec'
              onChange={handleCategoryChange}
            >
              <option value=''>None</option>
              {categoryList}
            </select>
          </div>
        </form>
      </div>
      <div className='main'>
        {filteredList.map((a) => (
          <Advert key={a._id} ads={a} />
        ))}
      </div>
      <Footer />
    </>
  );
}
