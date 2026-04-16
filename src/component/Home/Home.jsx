import React, { useEffect, useState } from 'react';
import Slider from '../Slider/Slider';
import { ToastContainer } from 'react-toastify';
import CountUp from 'react-countup';
import TypewriterText from '../Typewriter/TypewriterText';
import ReactSweper from '../Swiper/ReactSweper';
import Food from '../Pages/Food';
import axios from 'axios';
import { Link } from 'react-router';
import SocialImpact from '../Pages/SocialImpact';
import Impact from '../Pages/Impact';
import HomeHowItWorks from '../Pages/HomeHowItWorks';
import CallAction from '../Pages/CallAction';
import UseAxiosToken from '../hooks/UseAxiosToken';


const Home = () => {
    const axiosInstance = UseAxiosToken();
    const [foods, setFoods] = useState([])

    useEffect(() => {
        axiosInstance.get('/recentTasks')
            .then(data => setFoods(data.data));
    }, [axiosInstance]);
    
    return (
        <div className='w-full'>
            <ToastContainer />
            
            {/* Hero Section */}
            <section className='w-11/12 mx-auto py-6'> 
               <Slider />
            </section>

            <div className='w-11/12 mx-auto'>
                <section className='p-2 text-center py-16 text-base-content'>
                  <TypewriterText />
                </section>
               
                <section className="py-20">
                    <div className="flex flex-col items-center mb-12 text-base-content">
                        <h2 className="text-3xl lg:text-5xl font-black mb-4 text-center">
                            Find a <span className="text-gradient">Meal Nearby</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-primary rounded-full"></div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
                      {
                        foods.map((food)=> <Food food={food} key={food._id}></Food>)
                      }
                    </div>

                    <div className='mt-16 text-center'>
                        <Link to='/availableFood' className="btn btn-primary btn-lg rounded-full px-12 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                            Show All Food
                        </Link>
                    </div>
                </section>
            </div>

            {/* Alternating Background Section: Swiper */}
            <section className='bg-base-200 py-24'>
                <div className='w-11/12 mx-auto text-center text-base-content'>
                    <h2 className="text-3xl lg:text-4xl font-black mb-12 border-b-2 border-primary/20 pb-4 inline-block">Community <span className="text-primary">Success Stories</span></h2>
                    <ReactSweper />
                </div>
            </section>

            {/* Social Impact Section  */}
            <section className='py-24 px-4 bg-base-100'>
                <div className='w-11/12 mx-auto'>
                    <SocialImpact />
                </div>
            </section>

            <section className='bg-base-300/40 py-24 px-4'>
                <div className='w-11/12 mx-auto'>
                    <HomeHowItWorks />
                </div>
            </section>

            <section className='py-24 px-4 bg-base-100'>
                <div className="bg-base-100 border border-base-200 rounded-[3rem] p-8 md:p-16 premium-shadow w-11/12 mx-auto overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Left Side - Images */}
                        <div className="relative group text-left">
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
                                <img
                                  src="./hungry3.jpg"
                                  alt="Check-in device"
                                  className="object-cover w-full h-[400px] transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                      src="./hungry2.jpg"
                                      alt="Event badge pickup"
                                      className="object-cover w-full h-[200px]"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                      src="./hungry1.jpg"
                                      alt="Event badge pickup"
                                      className="object-cover w-full h-[200px]"
                                    />
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                        </div>

                        {/* Right Side - Text Content */}
                        <div className="space-y-10 text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-base-content leading-[1.1]">
                                Your small action today can make a <span className="text-gradient">big difference</span> in someone’s life
                            </h2>
                            <p className="text-base-content/70 text-lg">
                                Join our community of food sharers. Every meal shared is a step towards a zero-hunger neighborhood.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-primary"><CountUp duration={5} end={100} />+</span>
                                    <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">Meals Shared</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-secondary"><CountUp duration={5} end={50} />+</span>
                                    <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">Volunteers</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-accent"><CountUp duration={5} end={200} />+</span>
                                    <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">Lives Touched</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-base-200 py-24 px-4 text-base-content'>
                <div className='w-11/12 mx-auto'>
                    <Impact />
                </div>
            </section>

            <section className='py-24 px-4 text-base-content'>
                <div className='w-11/12 mx-auto'>
                    <CallAction />
                </div>
            </section>
        </div>
    );
};

export default Home;