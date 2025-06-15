import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AvailableFood from './AvailableFood';

const BrowseFood = () => {
    const Foods = useLoaderData()
    const [task, setTask] = useState(false)



    return (
        <div>
            <div className='text-end w-11/12 mx-auto'>
                <button onClick={()=>setTask(!task)}  className='btn btn-primary'>Change Layout</button>
            </div>
            <div className={`grid grid-cols-1    ${task? 'md:grid-cols-2': 'md:grid-cols-3'}  w-11/12 mx-auto gap-2 my-7`}>
             
                {
                    Foods.map((food, index) => <AvailableFood food={food} key={index}></AvailableFood>)
                }

            </div>

        </div>
    );
};

export default BrowseFood;