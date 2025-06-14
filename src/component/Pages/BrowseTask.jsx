import React from 'react';
import { useLoaderData } from 'react-router';
import Task from './Task';

const BrowseTask = () => {
    const tasks = useLoaderData()
    


    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-2 my-7'>
                {
                    tasks.map((task, index) => <Task task={task} key={index}></Task>)
                }

            </div>

        </div>
    );
};

export default BrowseTask;