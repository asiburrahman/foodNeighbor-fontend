import React from 'react';
import { useLoaderData } from 'react-router';
import AvailableFood from './AvailableFood';

const BrowseFood = () => {
    const Foods = useLoaderData()



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-2 my-7'>
                {
                    Foods.map((food, index) => <AvailableFood food={food} key={index}></AvailableFood>)
                }

            </div>

        </div>
    );
};

export default BrowseFood;