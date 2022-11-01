import React from 'react'
import Layout from '../../components/Layout';
import {Button, form} from "semantic-ui-react";

function newCampaign() {
  return (
    <Layout>
    <div className='new'> 
    <div className='min-contri'>
    <label>Minimum Contribution</label>
    <input type="text" placeholder="Minimum Contribution"/>
  </div>
  

  <Button >Submit</Button>

    
    
    </div>
    
    </Layout>
    
  )
}

export default newCampaign;