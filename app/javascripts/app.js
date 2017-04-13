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

    web3.eth.getBalance(acctSplit, 
            function(err, balSplitter) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
                var balSplitter_element = document.getElementById("balSplitter");
                balSplitter_element.innerHTML = web3.fromWei(balSplitter, 'ether');
            }
    );
  
    // Get the other account addresses from the contract
    // Using ether-pudding to get a Promise
    split.Alice()
        .then(
            function(Alice) {
                acctAlice = Alice;
                // This web3 instance returns a callback
                // Perhaps that is why the Dapp loads slowly sometimes
                // I wonder if changing it to a Promise would help? TODO
                web3.eth.getBalance(acctAlice, 
                    function(err, balAlice) {
                        if (err != null) {
                            alert("There was an error fetching your accounts.");
                            return;
                        }
                        var balAlice_element = document.getElementById("balAlice");
                        balAlice_element.innerHTML = web3.fromWei(balAlice, 'ether');
                    } 
                );
            }
        );

    split.Bob()
        .then(function(Bob) {
            acctBob = Bob;
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
            web3.eth.getBalance(acctCarol, function(err, balCarol) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
                var balCarol_element = document.getElementById("balCarol");
                balCarol_element.innerHTML = web3.fromWei(balCarol, 'ether');
            });
        });
};

function sendCoin() {
    var split = Splitter.deployed();

    // Attempt to get a floating point from the text field, not working...
    var amount = parseFloat(document.getElementById("amount").value);
    amount = web3.toWei(amount, 'ether');

    setStatus("Initiating transaction to send " + amount + " wei ... (please wait)");

    // We need to interact with the web3 layer to allow the user to authorize the transaction.
    // This should be web3 instance with callback
    split.contract.sendSplit({from:acctOwner, to:acctSplit, value:amount}, 
        function( err, txHash ) {
            if (err != null) {
                setStatus("There was an error sending ether to Split contract.");
                return;
            }
            else {
                setStatus("Waiting for transaction to be mined...");
                web3.eth.getTransactionReceipt(txHash, 
                    function(receipt) {
                        setStatus("Transaction complete.");
                        refreshBalance();
                    }
                );
            }
        }
    );
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

        // Get the balances for the other accounts registered in the contract
        refreshBalance();
    });
}
