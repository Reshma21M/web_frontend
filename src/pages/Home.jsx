import React, { useState } from "react";
import './Home.css'
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import DisplayCake from "../components/DisplayCake/DisplayCake";
import AppDownload from "../components/AppDownload/AppDownload";

const Home = () => {
    const [category, setCategory] = useState("All");
    return(
        <div className="home" id="home">
        <Header/>
        <Menu category={category} setCategory={setCategory}/>
        <DisplayCake category={category}/>
        <AppDownload />
        </div>
    )
}
export default Home