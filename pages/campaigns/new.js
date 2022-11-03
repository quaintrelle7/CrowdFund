import React from 'react'
import Layout from '../../components/Layout';
import factory from '../../blockend/factory'
import web3 from '../../blockend/web3';
import { Component } from 'react';
import {Router} from '../../routes';

class newCampaign extends Component {

  // const [state, setState] = useState({
  //   minimumContribution:''
  // })
  // setState({...state, minimumContribution: event.target.value})

  state = {
    minimumContribution:'',
    formErrorMessage: '',
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
      this.setState({formErrorMessage: err.message});
    }
    
    this.setState({loading:false});
  };

  render()
  {
  return (
    <Layout>
    <div className='new'> 
    <div className='min-contri'>
    <form onSubmit={this.onSubmit}>
      <label>Minimum Contribution</label>
    <input value ={this.state.minimumContribution}
    onChange={(event)=> this.setState({minimumContribution: event.target.value})}
    type="text" placeholder="Add in Wei"/>
    <message className="form-error-message" >{this.state.formErrorMessage}</message>
    <button>Create!</button>

    {/* if({this.state.loading})
    {
      <h1>I am Loading</h1>
    }
    else
    {
      <h1>I am NOT Loading</h1>
    } */}
    
    </form>
  </div>
    </div>
    </Layout>
    
  )
}

}

export default newCampaign;