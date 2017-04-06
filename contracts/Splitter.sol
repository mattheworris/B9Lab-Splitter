pragma solidity ^0.4.2;

import "ConvertLib.sol";

// Splitter: Week3 Small Project
// 1. Show the Balance of the Splitter Contract on the web page
// 2. Accounts for Alice, Bob and Carol.
// 3. Alice sends ether to the contract, Bob gets half, Carol gets half.
// 4. Web page shows all accounts and allows sending ether to contract.


contract Splitter {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter() {
		balances[tx.origin] = 15000;
	}

	function sendCoin(address rxBob, address rxCarol, uint amount) returns(bool sufficient) {
        uint remainder = 0;
        uint sharedAmt = 0;

        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;

        sharedAmt = amount/2;
        // TODO, need to deal with remainder?
        
        Transfer(msg.sender, rxBob, sharedAmt);
        Transfer(msg.sender, rxCarol, sharedAmt);
        return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

    function getBalance(address addr) returns(uint) {
		return balances[addr];
	}
}
