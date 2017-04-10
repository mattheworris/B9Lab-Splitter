var accounts;
var acctSplit;
var acctAlice;
var acctBob;
var acctCarol;
var acctOwner;

function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};

function refreshBalance() {
    var split = Splitter.deployed();

    web3.eth.getBalance(acctSplit, function(err, balSplitter) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }
        var balSplitter_element = document.getElementById("balSplitter");
        balSplitter_element.innerHTML = web3.fromWei(balSplitter, 'ether');
    });
  
    // Get the other account addresses from the contract
    split.Alice()
        .then(function(Alice) {
            acctAlice = Alice;
            console.log('acctAlice', acctAlice);
            web3.eth.getBalance(acctAlice, function(err, balAlice) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
                var balAlice_element = document.getElementById("balAlice");
                balAlice_element.innerHTML = web3.fromWei(balAlice, 'ether');
            });
        });

    split.Bob()
        .then(function(Bob) {
            acctBob = Bob;
            console.log('acctBob', acctBob);
            web3.eth.getBalance(acctBob, function(err, balBob) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
                var balBob_element = document.getElementById("balBob");
                balBob_element.innerHTML = web3.fromWei(balBob, 'ether');
            });
        });

    split.Carol()
        .then(function(Carol) {
            acctCarol = Carol;
            console.log('acctCarol', acctCarol);
            web3.eth.getBalance(acctCarol, function(err, balCarol) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
                var balCarol_element = document.getElementById("balCarol");
                balCarol_element.innerHTML = web3.fromWei(balCarol, 'ether');
            });
        });

//        split.getBalance.call(account, {from: account}).then(function(value) {
//    var balance_element = document.getElementById("balance");
//    balance_element.innerHTML = value.valueOf();
//  }).catch(function(e) {
//    console.log(e);
//    setStatus("Error getting balance; see log.");
//  });

};

function sendCoin() {
    var split = Splitter.deployed();

    var amount = parseInt(document.getElementById("amount").value);
    amount = web3.toWei(amount, 'ether');

    setStatus("Initiating transaction... (please wait)");

    web3.eth.sendTransaction({from:acctOwner, to:acctSplit, value:amount}, function(err, txHash) {
        if (err != null) {
            setStatus("There was an error sending ether to Split contract.");
            return;
        }
        else {
            setStatus("Waiting for transaction to be mined...");
            return web3.eth.getTransactionReceiptMined(txHash)
            .then( function(receipt) {
                setStatus("Transaction complete.");
                refreshBalance();
            });
        }
    });
};

window.onload = function() {
    var split = Splitter.deployed();
    acctSplit = split.address;

    // Get the user account from the web3 provider, it will only be one account
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
        // This is not necessarily the contract address!!
        acctOwner = accounts[0];
        console.log('accounts', accounts);

        // Get the balances for the other accounts registered in the contract
        refreshBalance();
    });

    web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
        var transactionReceiptAsync;
        interval = interval ? interval : 500;
        transactionReceiptAsync = function(txnHash, resovle, reject) {
            try {
                var receipt = web3.eth.getTransactionReceipt(txnHash);
                if (receipt == null) {
                    setTimeout(function () {
                                transactionReceiptAsync(txnHash, resolve, reject); },  
                                interval);
                }
                else {
                    resolve(receipt);
                }
            } catch(e) {
                reject(e);
            }
        };

        if (Array.isArray(txnHash)) {
            var promises = [];
            txnHash.forEach(function (oneTxHash) {
                promises.push(web3.eth.getTransactionReceiptMined(oneTxHash, interval));
            });
            return Promise.all(promises);
        }
        else {
            return new Promise(function (resolve, reject) {
                transactionReceiptAsync(txnHash, resolve, reject);
            });
        }
    };
}
