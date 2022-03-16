import './topbar.css';

// Topbar for filtering and searching (work in progress)
export default function Topbar({ onChange, categoryList }) {
  return (
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
            onChange={onChange}
          >
            <option value=''>None</option>
            {categoryList}
          </select>
        </div>
      </form>
    </div>
  );
}
