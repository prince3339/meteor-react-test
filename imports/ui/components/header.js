import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';

const Header = (props) => {

    return(
        <nav className="navbar navbar-default"> 
            <div className="container-fluid"> 
                <div className="navbar-header"> 
                    <button type="button" 
                        className="collapsed navbar-toggle" 
                        data-toggle="collapse" 
                        data-target="#bs-example-navbar-collapse-5" 
                        aria-expanded="false"> 
                        <span className="sr-only">Toggle navigation</span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                    </button> 
                    <a href="#" className="navbar-brand">Social feed</a> 
                </div> 
                <div className="collapse navbar-collapse" 
                    id="bs-example-navbar-collapse-5"> 
                    <div className="navbar-text navbar-right">
                        <AccountsUIWrapper />
                    </div>
                </div> 
            </div> 
        </nav>
    );
}


export default Header;