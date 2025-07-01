import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvailableFood from './AvailableFood';

const BrowseFood = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [layoutToggle, setLayoutToggle] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); // Default: High to Low

  useEffect(() => {
    axios(
      `https://food-neighbor-backend.vercel.app/availableFood?searchParams=${search}&sort=${sortOrder}`
    )
      .then(res => setFoods(res.data))
      .catch(err => console.error('Error fetching food:', err));
  }, [search, sortOrder]);

  return (
    <div className="w-11/12 max-w-7xl min-h-[80vh] mx-auto py-8 px-4 sm:px-0">
      {/* 🔍 Filters and Controls */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center mb-8">
        {/* Search Input */}
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="grow w-full"
            placeholder="Search food name..."
          />
          <svg
            className="w-4 h-4 opacity-50 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </label>

        {/* Sort Select */}
        <select
          className="select select-bordered "
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option className='text-xs md:text-sm ' value="desc">Quantity: High to Low</option>
          <option className='text-xs md:text-sm ' value="asc">Quantity: Low to High</option>
        </select>

        {/* Layout Toggle Button */}
        <button
          onClick={() => setLayoutToggle(!layoutToggle)}
          className="btn btn-primary w-full"
          type="button"
        >
          Toggle Layout
        </button>
      </div>

      {/* 🍱 Food Cards Grid */}
      <div
        className={`grid gap-6 ${
          layoutToggle
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        } justify-items-center`}
      >
        {foods.length > 0 ? (
          foods.map((food, index) => (
            <AvailableFood key={index} food={food} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No food found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseFood;
