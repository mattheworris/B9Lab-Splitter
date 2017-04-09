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

	function Splitter() {
        owner = msg.sender;
	}

	function () payable {
        uint sharedAmt = 0;

        sharedAmt = (msg.value)/2;
        // TODO, need to deal with remainder?
        
        if (Bob.send(sharedAmt + ((msg.value)%2) )) {
            if (!Carol.send(sharedAmt)) {
                throw;
            } 
        } else {
            throw;
        }
	}

    function killMe() {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}
