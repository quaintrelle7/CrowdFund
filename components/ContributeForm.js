import React from 'react'
import { Message, Button, Form, Input} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import abiCampaign from '../blockend/campaign'
import web3 from '../blockend/web3';
import {Router} from '../routes'

class ContributeForm extends React.Component{
    state = {
        value:"",
        errorMessage: '',
        loading: false
    };

    onSubmit = async(event) =>{

        //preventDefault to stop the form from attempting to sumit itself.
        event.preventDefault();

        //address coming from show.js
        const campaign = abiCampaign(this.props.address)
        this.setState({loading:true});

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`)

        }
        catch(err){
            this.setState({errorMessage: err.Message});
        }

        this.setState({loading:false, value:''})
    }


    render()
    {
        return(
        <Form onSubmit={this.onSubmit}>
        {/*  error={!!this.state.errorMessage} */}
            <Form.Field>
                <label >Amount to contribute</label>
                <Input value={this.state.value}
                    onChange={event => this.setState({value: event.target.value})}
                    label="ether" labelPosition="right"
                />
            </Form.Field>
            {/* <Message error header="Oops!" content={this.state.errorMessage}/> */}
                <message className="form-error-message" >{this.state.errorMessage}</message>

            <Button primary loading={this.state.loading}>Contribute</Button>
        </Form>);
    }
}

export default ContributeForm