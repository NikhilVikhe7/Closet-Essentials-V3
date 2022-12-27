import React from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
const Home = () => {
    return (
        <div>
            <Announcement></Announcement>
            <Navbar></Navbar>
            <Slider></Slider>
            <Categories></Categories>
            <NewsLetter></NewsLetter>
            <Footer></Footer>
        </div>
    );
};

export default Home;