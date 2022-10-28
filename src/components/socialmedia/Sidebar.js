import React from "react";
import './Sidebar.css';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SidebarOptions from "./SidebarOptions";

function Sidebar() {
    return (
        <div className="sidebar">
            {/* Twitter icon */}
            {/* <HomeIcon /> */}


            <SidebarOptions text= "Home" Icon={HomeIcon}/>
            <SidebarOptions text="Explore" Icon={SearchIcon}/>
            <SidebarOptions text="Notifications" Icon={NotificationsNoneIcon}/>
            {/* Sidebar Options */}
            {/* Sidebar Options */}
            {/* Sidebar Options */}
            {/* Sidebar Options */}
            {/* Sidebar Options */}

            {/* Button -> Tweet */}
        </div>
    );
}

export default Sidebar;