// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{

        //msg.sender is the campaign creator
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);

    }

    function getDeployedContracts() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{

    address public manager;
    uint public minContribution;
    mapping (address=>bool) public approvers;

    uint public approversCount;
    struct Request{
        string description;
        address recipient;
        uint value;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;

    }

    Request[] public requests;

    constructor(uint min, address campaignCreator){
        manager = campaignCreator;
        minContribution = min;
    }

    function contribute() public payable{
        require(msg.value > minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient)
     public onlyManager{
         //nested mapping doesn't work directly, so first store the code in storage
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;

        
    }

    function approveRequest(uint id) public payable{

        Request storage request = requests[id];
        require(approvers[msg.sender]);
        request.approvalCount++;
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;

    }
    
    function finalizeRequest(uint id) public onlyManager{
        
        //storage: exacty the same copy whih is already there. ValueByReference
        Request storage request = requests[id];
        require(!request.complete);
        require(request.approvalCount>(approversCount/2));
        request.complete = true;

    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return(
            minContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );   
    }

    function getRequestsCount()public view returns(uint){
        return(
            requests.length
        );
    }


    modifier onlyManager(){
        require(msg.sender ==manager);
        _;
    }



}