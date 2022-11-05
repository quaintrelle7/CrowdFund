import React from 'react';
import Header from './Header';
function Layout(props) {
  return (
    <div className='layout'>
    <Header/>
    {props.children}
    {/* <Footer/> */}
    <h1></h1>
    </div>
  )
};

export default Layout