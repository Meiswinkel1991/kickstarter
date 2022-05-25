// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint _minimumContribution) public {
        address newCampaign = address(new Campaign(_minimumContribution,msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }

}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }


    // Storage variables
    address public manager;

    uint public numApprovers;
    mapping(address => bool) public approvers;
    
    uint public minimumContribution;

    uint public numRequests;
    mapping(uint => Request) public requests;
    

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint _minimumContribution,address _creator) {
        minimumContribution = _minimumContribution;
        manager = _creator;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;

        numApprovers ++;
    }

    function createRequest(
        string memory _description,
        uint _value,
        address payable _recipient
    ) public restricted {

        Request storage newRequest = requests[numRequests++];
        
        newRequest.description =  _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        //every sender must be a approver and didnt vote for this request!!
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvalCount ++;
        request.approvals[msg.sender] = true;

    }

    function finalizeRequest(uint index) public payable restricted {

        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > (numApprovers / 2));


        // send the value to recipient
        request.recipient.transfer(request.value);



        request.complete = true;
    }


    function getSummary() public view returns(
        uint,
        uint,
        uint,
        uint,
        address
    ) {
        return(
            minimumContribution,
            address(this).balance,
            numRequests,
            numApprovers,
            manager
        );
    }

    

}