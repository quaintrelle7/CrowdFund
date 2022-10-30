import React, {Component}from 'react';
import factory from '../blockend/factory';
import {Card} from 'semantic-ui-react';

class CampaignIndex extends React.Component{

    //Whenever component is rendered the getInitialProps is get called

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns: campaigns};
    }
    // async componentDidMount(){
    //     console.log(campaigns);
    // }
    renderCampaigns(){
        const items = this.props.campaigns.map(address=>{
            return{
            header: address,
            description: <a>View Campaign</a>,
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
            <div>{this.renderCampaigns()}</div>
        );
    }
}
// function Campaignindex() {
//   return (
//     <div>index</div>
//   )
// }

 export default CampaignIndex;

