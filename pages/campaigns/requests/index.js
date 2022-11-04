import React from 'react'
import {Button, Table} from 'semantic-ui-react'
import {Link} from '../../../routes'
import Layout from '../../../components/Layout';
import abiCampaign from '../../../blockend/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends React.Component{


    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = abiCampaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const contributersCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
            .fill()
            .map((element, index)=>{
                return campaign.methods.requests(index).call();
            })
        )

        
        return{address, requests, requestCount, contributersCount};
    }

    renderRow(){
        return this.props.requests.map((request, index)=>{
            return <RequestRow
                key={index}
                id = {index}
                request={request}
                address ={this.props.address}
                contributersCount = {this.props.contributersCount}
            />
        })
    }
    render(){

        const {Header, HeaderCell, Row, Body} = Table;
        return(
           <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    //Two curly braces for the style tag : One to recognize JSX, another to recognize an Object
                    <Button primary floated='right' style={{marginBottom:10}}>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>
                            ID
                        </HeaderCell>
                        <HeaderCell>
                            Description
                        </HeaderCell>
                        <HeaderCell>
                            Amount
                        </HeaderCell>
                        <HeaderCell>
                            Recipient
                        </HeaderCell>
                        <HeaderCell>
                            Approval Count
                        </HeaderCell>
                        <HeaderCell>
                            Approve
                        </HeaderCell>
                        <HeaderCell>
                            Finalize
                        </HeaderCell>
                       
                    </Row>
                </Header>
                <Body>{this.renderRow()}</Body>
            </Table>

            <div>Found {this.props.requestCount} requests!</div>
           </Layout>
        );
    }

}

export default RequestIndex