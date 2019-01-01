import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sideNavItems';

const Nav = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    backgroundColor:"#242424",
                    color : '#fff',
                    maxWidth : "220px"
                }}
            >
                <SideNavItems />
            </SideNav>
        </div>
    );
};

export default Nav;