import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '../../components/Layout'
import abiCampaign from '../../blockend/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../blockend/web3'
import ContributeForm from '../../components/ContributeForm'
import {Link} from '../../routes'

class ShowCampaign extends Component {
  static async getInitialProps(props){
    // console.log(props.query.address);
    const campaign = abiCampaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return{

      address: props.query.address,
      minimumContribution : summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount : summary[3],
      manager: summary[4]
    };
  }

  renderSummary(){
    const{
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'Manager is a creator of campaign and can create requests to withdraw money',
        // style : {'overflowWrap : 'break-word'},
      },

       {
        header: minimumContribution,
        meta: 'Minimum Contribution in Wei',
        description: 'Minimum contribution needs to made to be added as an approver'
      },
       {
        header: requestsCount,
        meta: 'Total Count of Requests',
        description: 'Number of requests made by manager for spending the money'
      },
       {
        header: approversCount,
        meta: 'No. of Contributers',
        description: 'Total numbers of people who have contributed to the campaign'
      },
       {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance of Contract',
        description: 'Sum of the money contributed to the campaign by contributers'
      }
    ];

    return <Card.Group items={items}/>;
  }
  render()
  {
    return (
        <Layout>
            <h3 className='heading-index'>About Campaign</h3>

            <div className='show'>
                {this.renderSummary()}
            </div>

                  

              <div className="view-request">
                 <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Requests</Button>
                  </a>
                 </Link>

                </div> 
               <div className="contribute">
              
                <ContributeForm address={this.props.address}/>

              </div> 
                
              
        </Layout>
    )
  }
}

export default ShowCampaign