pragma solidity ^0.5.12;

contract Inbox {
    string public message;
    
    constructor(string memory initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    /*
    // getter function is not required for public storage variable it
    // automatically creates a getter function with the same name as
    // of the variable 
    
    function getMessage() public view returns (string memory) {
        return message;
    }
    */
}
