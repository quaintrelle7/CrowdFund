import React from 'react'
import Layout from '../../components/Layout';
import factory from '../../blockend/factory'
import web3 from '../../blockend/web3';
import { Component } from 'react';
import {Router} from '../../routes';
import{Message, Form, Button, Input} from 'semantic-ui-react'
class newCampaign extends Component {

  // const [state, setState] = useState({
  //   minimumContribution:''
  // })
  // setState({...state, minimumContribution: event.target.value})

  state = {
    minimumContribution:'',
    errorMessage: '',
    loading: false
  };

  onSubmit =  async(event) => {
    event.preventDefault();

    this.setState({loading:true});

    try{
    const accounts = await web3.eth.getAccounts();
     await factory.methods
    .createCampaign(this.state.minimumContribution)
    .send({
      from: accounts[0],
    });
    
    Router.pushRoute('/');
    }
    catch(err){
      this.setState({errorMessage: err.message});
    }
    
    this.setState({loading:false});
  };

  render()
  {
  return (
    <Layout>
    <div className='contribute'> 
    
    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

    <Form.Field>
    <label>Minimum Contribution</label>
    <Input value ={this.state.minimumContribution}
    onChange={(event)=> this.setState({minimumContribution: event.target.value})}
    label="Wei" labelPosition='right' placeholder="Add in Wei"/>
    </Form.Field>
      
    <Message error header="Oops!" content={this.state.errorMessage}/>
    <Button primary loading={this.state.loading}>Create!</Button>

    </Form>
  
    </div>
    </Layout>
    
  )
}

}

export default newCampaign;