import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

function Header() {
  return (
   <div className='header-js'>
    <Link route= '/'>
    <a className='app-logo'>
     <h2>CrowdFund</h2> 
    </a>
    </Link>
    <div className="searchbar"></div>

    {/* <Link route= '/'>
    <a className='app-logo'>
      <h2>Campaigns</h2>
    </a>
    </Link> */}

    <Link route= '/campaigns/new'>
    <a >
    <div className='create'>Create Campaign</div>
    </a>
    </Link>
    
    
   </div>
  )
}

export default Header