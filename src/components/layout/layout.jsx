import React from 'react';
import AppNavBar from "./appNavBar.jsx";
import Footer from "./footer.jsx";

const Layout = (props) => {
    return (
        <div>
            <AppNavBar/>
            {props.children}
            <Footer/>

        </div>
    )
};

export default Layout;