import React from 'react';
import Header from '../Component/Header';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer ';

const AuthLayout = () => {
    return (
        <div>
           <header>
            <Header></Header>
            </header> 
            <main>
                <Outlet>

                </Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;