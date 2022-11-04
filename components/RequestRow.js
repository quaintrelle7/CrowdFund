import React from 'react'
import { Table, Button } from 'semantic-ui-react';
import web3 from '../blockend/web3';
import abiCampaign from '../blockend/campaign'
import { read } from 'fs-extra';

class RequestRow extends React.Component{
   
    onApprove = async() =>{
        const campaign = abiCampaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from:accounts[0]
        })
    };

    onFinalize = async() =>{
        const campaign = abiCampaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from:accounts[0]
        })
    } 


    render()
    {
         const{Row, Cell} = Table;
         const{id, request, contributersCount} = this.props;
        //  const readyToFinalize = request.approvalCount> contributersCount/2;
// disabled={request.complete} positive={readyToFinalize && !request.complete}
        return(<Row >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{contributersCount}</Cell>
        {/* <Cell>{request.complete}</Cell> */}
       { request.complete?null:
         (<Cell><Button color='green' onClick={this.onApprove}>Approve!</Button></Cell>)}

        <Cell><Button color='teal' onClick={this.onFinalize}>Finalize!</Button></Cell>

        </Row>);
    }
}

export default RequestRow