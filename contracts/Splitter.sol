pragma solidity ^0.4.2;

// Splitter: Week3 Small Project
// 1. Show the Balance of the Splitter Contract on the web page
// 2. Accounts for Alice, Bob and Carol.
// 3. Alice sends ether to the contract, Bob gets half, Carol gets half.
// 4. Web page shows all accounts and allows sending ether to contract.


contract Splitter {
    address owner;
    // These are the accounts from Metamask
    address public Alice = 0x47f54beda3e1bc5b9f1e8cea9fbf5628d6331f96;
    address public Bob = 0xbe7930fb23a69c62368b8b09b7d6178a0b86f2ac;
    address public Carol = 0xf39821554e0d3c9c5e269d5132f4d95230460bae;
    uint256 sharedAmt = 0;

    // Constructor, run once during migration, not part of the 
    // deployed contract
	function Splitter() {
        owner = msg.sender;
	}

    // From a transaction, we automatically get:
    //      address msg.sender, address that called the function
    //      uint    msg.value, in wei
    //      address tx.origin, external account that initiated transaction
    // From app.js
    //      uint    sharedAmt, in ether
	function sendSplit(uint sharedAmt) payable {

        //sharedAmt = (msg.value)/2;
        // TODO, need to deal with remainder?
        // Web UI converts from ether to wei, so there is never a 
        // remainder. If someone else calls the contract, then the wei
        // remainder goes where?
        
        if (!Bob.send(sharedAmt/2)) throw;
        if (!Carol.send(sharedAmt/2)) throw;
	}

    function killMe() {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}
