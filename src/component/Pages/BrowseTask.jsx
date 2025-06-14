import React from 'react';
import { useLoaderData } from 'react-router';
import Food from './Food';

const BrowseTask = () => {
    const Foods = useLoaderData()



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-2 my-7'>
                {
                    Foods.map((food, index) => <Food food={food} key={index}></Food>)
                }

            </div>

        </div>
    );
};

export default BrowseTask;