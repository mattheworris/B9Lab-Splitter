pragma solidity ^0.4.2;

// Splitter: Week3 Small Project
// 1. Show the Balance of the Splitter Contract on the web page
// 2. Accounts for Alice, Bob and Carol.
// 3. Alice sends ether to the contract, Bob gets half, Carol gets half.
// 4. Web page shows all accounts and allows sending ether to contract.


contract Splitter {
    address owner;
    // These are the accounts from Metamask
    address Alice = 0x47f54beda3e1bc5b9f1e8cea9fbf5628d6331f96;
    address Bob = 0xbe7930fb23a69c62368b8b09b7d6178a0b86f2ac;
    address Carol = 0xf39821554e0d3c9c5e269d5132f4d95230460bae;

	function Splitter() payable {
        owner = msg.sender;
	}

	function sendCoin(uint amount) payable returns(bool sufficient) {
        uint remainder = 0;
        uint sharedAmt = 0;

        sharedAmt = amount/2;
        // TODO, need to deal with remainder?
        
        if(Bob.send(sharedAmt)){
            if(Carol.send(sharedAmt)){
                return true;
            }
        }
        return false;
	}

    function getBalance() returns (uint) {
        return address(this).balance;
    }

    function killMe() {
        if (msg.sender == owner) {
            suicide(owner);
        }
    }
}
