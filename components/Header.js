import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

function Header() {
  return (
   <div className='header'>
    <Link route= '/'>
    <a className='app-logo'>
      CrowdFund
    </a>
    </Link>
    <div className="searchbar"></div>

    <Link route= '/'>
    <a className='app-logo'>
      Campaigns
    </a>
    </Link>

    <Link route= '/campaigns/new'>
    <a className='app-logo'>
      +
    </a>
    </Link>
    
    
   </div>
  )
}

export default Header