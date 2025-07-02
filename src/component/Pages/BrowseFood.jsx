import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AvailableFood from './AvailableFood';

const BrowseFood = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [layoutToggle, setLayoutToggle] = useState(false);

  // Load data with TanStack Query
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['availableFood', search, sortOrder],
    queryFn: async () => {
      const res = await axios.get(
        `https://food-neighbor-backend.vercel.app/availableFood?searchParams=${search}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-6 min-h-[80vh]">
      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search food name..."
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        {/* Sort */}
        <select
          className="select select-bordered w-full"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Quantity: High to Low</option>
          <option value="asc">Quantity: Low to High</option>
        </select>

        {/* Toggle Layout */}
        <button
          onClick={() => setLayoutToggle(!layoutToggle)}
          className="btn btn-primary w-full"
        >
          Toggle Layout
        </button>
      </div>

      {/* Food List */}
      <div
        className={`grid gap-6 ${
          layoutToggle
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        } justify-items-center`}
      >
        {isLoading ? (
          <p className="text-center text-gray-400 col-span-full">Loading...</p>
        ) : foods.length > 0 ? (
          foods.map((food, i) => <AvailableFood key={i} food={food} />)
        ) : (
          <p className="text-center text-gray-400 col-span-full">No food found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseFood;
