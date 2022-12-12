import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:"/task",
            name:"Task",
            icon:<FaUserAlt/>
        },
        {
            path:"/user",
            name:"Users",
            icon:<FaUserAlt/>
        }
        
    ]
    return (
        <div className="container">
           <div style={{width:"200px"}} className="sidebar">
               <div className="top_section">
                 
                   
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "none" : "block"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;