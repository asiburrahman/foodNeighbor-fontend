import React from 'react';
import UseAxiosToken from '../hooks/UseAxiosToken';

const useRequestApi = () => {
  const axiosSecure = UseAxiosToken();

  const myRequestFood = async (email) => {
    const response = await axiosSecure.get(`/requestFood/${email}`);
    return response.data;
  };

  const MyFood = async (email) => {
    const response = await axiosSecure.get(`/myPostedFood/${email}`);
    return response.data;
  };

  return { myRequestFood, MyFood };
};

export default useRequestApi;