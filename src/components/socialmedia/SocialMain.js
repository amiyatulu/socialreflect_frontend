import React from "react";
import Sidebar from "./Sidebar";
import "./SocialMain.css"
import Feed from "./Feed";
import Widgets from "./Widgets";
import ResponsiveAppBar from '../ResponsiveAppBar';
function SocialMain() {
    return (
        <div>
        <ResponsiveAppBar/>
        <br/>
        <div className="app">
           
            {/* Sidebar */}
            <Sidebar/>

            {/* Feed */}
            <Feed />
            {/* Widgets */}

            <Widgets/>
        </div>
        </div>
    );
}

export default SocialMain;