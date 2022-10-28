import React from "react";
import Sidebar from "./Sidebar";
import "./SocialMain.css"
import Feed from "./Feed";
import Widgets from "./Widgets";
function SocialMain() {
    return (
        <div className="app">
            {/* Sidebar */}
            <Sidebar/>

            {/* Feed */}
            <Feed />
            {/* Widgets */}

            <Widgets/>
        </div>
    );
}

export default SocialMain;