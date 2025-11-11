import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import { Outlet } from 'react-router';
import Banner from '../Component/Banner';

import { useNavigation } from 'react-router';
import Loading from '../Pages/Loading';

const HomeLayout = () => {
    const {state}=useNavigation()
    return (
        <div>
            <header>
                <Header></Header>

            </header>
            <main className='w-11/12 mx-auto'>
                <Banner></Banner>
                {state=="loading" ? <Loading></Loading> : <Outlet></Outlet>} 
                
            </main>
            <footer>
                
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;