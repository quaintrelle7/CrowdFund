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
        meta: '',
        description: 'Manager is a creator of campaign and can create requests to withdraw money'
      },
       {
        header: requestsCount,
        meta: 'Address of manager',
        description: 'Manager is a creator of campaign and can create requests to withdraw money'
      },
       {
        header: approversCount,
        meta: 'Address of manager',
        description: 'Manager is a creator of campaign and can create requests to withdraw money'
      },
       {
        header: balance,
        meta: 'Address of manager',
        description: 'Manager is a creator of campaign and can create requests to withdraw money'
      }
    ];

    return <Card.Group items={items}/>;
  }
  render()
  {
    return (
        <Layout>
            <div className='show'></div>
            <h3>Campaigns</h3>
            <Grid>
              <Grid.Column width={10}>
                 {this.renderSummary()}
                 <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Requests</Button>
                  </a>
                 </Link>
              </Grid.Column>
            </Grid>
           <Grid>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
                </Grid.Column>
            </Grid>
        </Layout>
    )
  }
}

export default ShowCampaign