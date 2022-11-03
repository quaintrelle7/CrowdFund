import React, {Component}from 'react';
import factory from '../blockend/factory';
import {Button, Card} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';
import 'semantic-ui-css/semantic.min.css';

class CampaignIndex extends React.Component{

    //Whenever component is rendered the getInitialProps is get called

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedContracts().call();
        return {campaigns: campaigns};
    }
    // async componentDidMount(){

    //     const campaigns = await factory.methods.getDeployedContracts().call();
    //     console.log(campaigns);
    // }
    renderCampaigns(){
        const items = this.props.campaigns.map(address=>{
            return{
            header: address,
            description:(
                <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
            ) ,
            fluid: true
            };
        });

        return <Card.Group items={items}/>;
    };
// In JavaScript, the this keyword refers to an object.
//  Which object depends on how this is being invoked (used or called).
// The this keyword refers to different objects depending on 
// how it is used: In an object method, this refers to the object.
    render(){
        return(
            <Layout>
            <div className='index'>
            <h3>Open Campaigns</h3>
            <div>{this.renderCampaigns()} </div>
            <div className='view'>Hi</div>

            <Link route= '/campaigns/new'>
                <a className='app-logo'>
                    <Button className='create-campaign-btn'>Create Campaign</Button>
                </a>
            </Link>

            </div>
            </Layout>
            
            
        );
    }
}


 export default CampaignIndex;

