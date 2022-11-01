import Web3 from "web3";
 
let web3;

//typeof operator is to see if the var is defined
//to see if we are on the server or browser
if (typeof window !=="undefined" && typeof window.ethereum !== "undefined") {
    //we are in the browser AND metamask is running
    //typeof window in the browser is object
    window.ethereum.request({ method: "eth_requestAccounts" });

    web3 = new Web3(window.ethereum);

}else{
    //In the server OR in browser where metamask is not running
    //Infura to access goerli test network for deployment script
    const provider = new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/b3b0f06164064cc6b9c2811fd0ea2f60'

    );



    web3 = new Web3(provider);
}
export default web3;

