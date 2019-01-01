import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

const SideNavItems = () => {
    const items = [
        {
            type : "navItem",
            icon : "home",
            text : "Home",
            link : "/",
            restricted : false
        },
        {
            type : "navItem",
            icon : "user",
            text : "Profile",
            link : "/user/profile",
            restricted : true
        },
        {
            type : "navItem",
            icon : "lock",
            text : "Manage Admins",
            link : "/user/admins",
            restricted : true
        },
        {
            type : "navItem",
            icon : "pencil-square-o",
            text : "My Reiviews",
            link : "/user/reviews",
            restricted : true
        },
        {
            type : "navItem",
            icon : "pencil",
            text : "Write a Review",
            link : "/user/addReview",
            restricted : true
        },
        {
            type : "navItem",
            icon : "sign-in",
            text : "Login",
            link : "/user/login",
            restricted : true
        },
        {
            type : "navItem",
            icon : "sign-out",
            text : "Log Out",
            link : "/user/logout",
            restricted : true
        }
    ]


    const elements = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
        </div>        
    )
    

    const showItems= () => {
        return items.map((item, i) => (
            elements(item, i)
        ))
    }

    return (
        <div>
            {showItems()}
        </div>
    );
};

export default SideNavItems;