import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import Advert from '../../components/advert/Advert';

import { Oval } from 'react-loader-spinner';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './home.css';

// API
const url = 'https://fakestoreapi.com/products/';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // API call to ads(products)
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('something went wrong while requesting ads');
      })
      .then((ads) => setAds(ads));
  }, []);

  // API call to category list
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );
      setCategories(res.data);
    };
    getCategories();
  });

  // List of all the categories
  const categoryList = [];

  for (const [i, value] of categories.entries()) {
    categoryList.push(
      <option value={value} key={i}>
        {value}
      </option>
    );
  }

  // Category Handler
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Ads filter
  const getFilteredList = () => {
    if (!selectedCategory) {
      return ads;
    }
    return ads.filter((item) => item.category === selectedCategory);
  };

  // Array of the Ads filtered
  const filteredList = useMemo(getFilteredList, [selectedCategory, ads]);

  // Pagination of the web
  const adsShown = 4; // Change quantity to show more ads
  const maxPages = Math.round(filteredList.length / adsShown); //Max pages allowed

  // Next page
  function goToNextPage() {
    currentPage === maxPages
      ? setCurrentPage((page) => page)
      : setCurrentPage((page) => page + 1);
  }

  // Previous page
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  //AdsShown for pages
  const getPaginatedData = () => {
    let filteredAds = filteredList;
    const startIndex = currentPage * adsShown - adsShown;
    const endIndex = startIndex + adsShown;
    return filteredAds.slice(startIndex, endIndex);
  };

  return (
    <>
      <Topbar onChange={handleCategoryChange} categoryList={categoryList} />

      <div>
        {ads.length > 0 ? (
          <div className='main'>
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
              <ChevronLeftIcon />
            </button>

            {getPaginatedData().map((d, idx) => (
              <Advert key={idx} ads={d} />
            ))}

            <button
              onClick={goToNextPage}
              className={`next ${currentPage === maxPages ? 'disabled' : ''}`}
            >
              <ChevronRightIcon />
            </button>
          </div>
        ) : (
          <div className='loader'>
            <h1>Loading Ads</h1>
            <Oval color='#0069aa' height={150} width={150} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
