import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosToken from '../hooks/UseAxiosToken';
import Food from './Food';

const BrowseFood = () => {
  const axiosInstance = UseAxiosToken();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [layoutToggle, setLayoutToggle] = useState(false);

  // Load data with TanStack Query
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['availableFood', search, sortOrder],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/availableFood?searchParams=${search}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto py-12 min-h-[80vh]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
              <h2 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
                  Available <span className="text-gradient">Meals</span>
              </h2>
              <p className="text-base-content/40 mt-1 font-medium italic">Explore fresh food shared by your neighbors</p>
          </div>
          
          <button
            onClick={() => setLayoutToggle(!layoutToggle)}
            className="btn btn-primary rounded-full px-8 text-white shadow-lg transform active:scale-95 transition-all"
          >
            {layoutToggle ? 'Grid View' : 'Single Column'}
          </button>
      </div>

      {/* Filter Section */}
      <div className="bg-base-200 p-6 rounded-[2rem] border border-base-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
        {/* Search */}
        <div className="relative group">
            <input
              type="text"
              placeholder="Search food by name..."
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full rounded-2xl bg-base-100 border-base-200 focus:border-primary transition-all pr-12 text-base-content"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>

        {/* Sort */}
        <select
          className="select select-bordered w-full rounded-2xl bg-base-100 border-base-200 focus:border-primary transition-all text-base-content"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Sort by: Quantity (High to Low)</option>
          <option value="asc">Sort by: Quantity (Low to High)</option>
        </select>
      </div>

      {/* Food List */}
      <div
        className={`grid gap-10 ${
          layoutToggle
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        } justify-items-center`}
      >
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-base-content/40 font-bold tracking-widest uppercase text-xs">Cooking up results...</p>
          </div>
        ) : foods.length > 0 ? (
          foods.map((food) => <Food key={food._id} food={food} />)
        ) : (
          <div className="col-span-full py-20 text-center">
              <div className="w-32 h-32 mx-auto opacity-20 mb-4 bg-base-content/20 rounded-full flex items-center justify-center">
                   <FaBoxOpen className="text-6xl text-base-content" />
              </div>
              <p className="text-xl font-bold text-base-content/40">No meals found in this area.</p>
              <button onClick={() => setSearch('')} className="btn btn-ghost btn-sm mt-2 text-primary">Clear search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseFood;
