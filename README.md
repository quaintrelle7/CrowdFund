Git clone and Run following commpands from root directory:

    npm install
    npm run dev

- Make an .env file and set
    
    Replace METAMASK_PHRASE with Metamask pneumonics and INFURA_API_KEY with yours. In deploy.js.

- Test on Ethereum network.



### Working

In the crowdfunding project, I have created a smart contract for anyone who wants to create the campaign. The creator of the campaign is also known as the ‘manager of the campaign contract’. The manager only can spend the money donated to the contract. Where in each request manager will have to specify the recipient of the money and the money manager wants to spend. To donate the money from the campaign balance, the manager needs the permission of the contributors of the campaign. The manager can create the ‘Request for spending money’ . For each request, all the contributors can vote. If the request gets approval from 50% or more contributors, then the manager can spend the money.  

### Tools and Tech:

I have used the NextJS framework for the frontend and have written the contract in solidity.
There are two contracts. One is to create the campaign and another is the factory contract to ask our solidity program to create the campaign. As this will save the campaign contract from any attacks and tampering.
