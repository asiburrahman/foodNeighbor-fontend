import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import AvailableFood from './AvailableFood';
import axios from 'axios';

const BrowseFood = () => {
    // const Foods = useLoaderData()
    const [Foods, SetFood] = useState([])
    const [search, setSearch]= useState('')
    const [task, setTask] = useState(false)



    useEffect(() => {


        axios(`https://food-neighbor-backend.vercel.app/availableFood?searchParams=${search}`).then(res => SetFood(res.data))

    }, [search]);
    console.log(Foods);


    return (
        <div>
            <div className='grid pt-4 grid-cols-1 lg:grid-cols-3 w-10/12 mx-auto'>
                <div>

                </div>
                <div className=''>
                    <label className="input bg-secondary-content">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='search' onChange={(e)=>setSearch(e.target.value)} type="search" className='bg-secondary-content' required placeholder="Search" />
                    </label>
                </div>
                <div className='text-end w-11/12 mx-auto'>
                    <button onClick={() => setTask(!task)} className='btn btn-primary'>Change Layout</button>
                </div>
            </div>

            <div className={`grid grid-cols-1    ${task ? 'md:grid-cols-2' : 'md:grid-cols-3'}  w-11/12 mx-auto gap-2 my-7`}>

                {
                    Foods.map((food, index) => <AvailableFood food={food} key={index}></AvailableFood>)
                }

            </div>

        </div>
    );
};

export default BrowseFood;