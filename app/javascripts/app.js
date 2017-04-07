var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var split = Splitter.deployed();
  var acctAlice;

  split.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });

  //web3.eth.getAccounts(function(err, accs) {
   // if (err != null) {
    //  alert("There was an error fetching your accounts.");
     // return;
    //}
   //acctAlice = accs[1];
  //console.log('accs', accs, 'acctAlice', acctAlice);
  //});
  // Try to Display the next account for Alice
  //split.getBalance.call(acctAlice, {from: account}).then(function(value) {
    //var balance_element = document.getElementById("balanceAlice");
    //balance_element.innerHTML = value.valueOf();
  //}).catch(function(e) {
    //console.log(e);
    //setStatus("Error getting balanceAlice; see log.");
  //});
  
  // Try to Display the next account for Bob 
  //account = accounts[2];
  //split.getBalance.call(account, {from: account}).then(function(value) {
    //var balance_element = document.getElementById("balanceBob");
    //balance_element.innerHTML = value.valueOf();
  //}).catch(function(e) {
    //console.log(e);
    //setStatus("Error getting balanceBob; see log.");
  //});
  
  // Try to Display the next account for Carol 
  //account = accounts[3];
  //split.getBalance.call(account, {from: account}).then(function(value) {
    //var balance_element = document.getElementById("balanceCarol");
    //balance_element.innerHTML = value.valueOf();
  //}).catch(function(e) {
    //console.log(e);
    //setStatus("Error getting balanceCarol; see log.");
  //});
};

function sendCoin() {
  var split = Splitter.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var rxBob = document.getElementById("rxBob").value;
  var rxCarol = document.getElementById("rxCarol").value;

  setStatus("Initiating transaction... (please wait)");

  console.log('rxBob', rxBob, 'rxCarol', rxCarol, 'account', account);
  split.sendCoin(rxBob, rxCarol, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error splitting coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('accounts', accounts);

    refreshBalance();
  });
}
