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

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}
}
