import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import AppData from '../Component/AppData';
import { useSpring, animated, config } from '@react-spring/web';
import styles from './styles.module.css';
import ServiceData from '../Component/ServiceData';

const BackgroundAnimation = () => {
    const [{ background }] = useSpring(
        () => ({
            from: { background: 'var(--step0)' },
            to: [
                { background: 'var(--step1)' },
                { background: 'var(--step2)' },
                { background: 'var(--step3)' },
                { background: 'var(--step4)' },
            ],
            config: config.molasses,
            loop: { reverse: true },
        }),
        []
    );

    return (
        <animated.div
            className={`${styles.background} absolute inset-0 w-full h-full`}
            style={{ background }}
        >
            <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-30">
                <div className={styles.block}></div>
                <div className={styles.block}></div>
                <div className={styles.block}></div>
            </div>
        </animated.div>
    );
};

const Home = () => {
    const appsdata = useLoaderData();
    console.log(appsdata)

    useEffect(() => {
        document.title = 'Home | Mobile App';
    }, []);

    return (
        <div className="relative px-4 sm:px-6 lg:px-10 py-10 overflow-hidden">
            
            <div className="absolute inset-0 -z-10">
                <BackgroundAnimation />
            </div>

            
            <div className="text-center md:text-left mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Our Popular Services
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-2">
                    Enjoy the top-rated games our users love the most.
                </p>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {appsdata
                    .sort((a, b) => b.ratings - a.ratings)
                    .slice(0, 6)
                    .map((data) => (
                        
                        <ServiceData key={data.id} data={data} ></ServiceData>
                    ))}
            </div>

            
            <div className="flex justify-center mt-10">
                <Link
                    to="/all-games"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
                >
                    Load More
                </Link>
            </div>
        </div>
    );
};

export default Home;
