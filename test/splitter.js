contract('Splitter', function(accounts) {
    
    console.log('accounts', accounts);
    // Put this on hold; don't understand promises and complex return values
    //it("should report contract balances correctly", function() {
        //var split = Splitter.deployed();
        //return split.getBalance.call(account_one).then(function(balance) {
            //account_one_starting_balance = balance.toNumber();
            //console.log('one start', account_one_starting_balance);
            //return split.getBalance.call(account_two);
        //}   
    //});

    it("should get balance correctly", function (done) {
        var split = Splitter.deployed().getBalance()
        .then(function (balance) {
            console.log('balance', balance);
            assert.isOk(balance, "balance is ok");
            return split.getBalance().call();
        })
        .then(function(resultValue) {
            console.log('resultValue', resultValue);
            assert.equal(resultValue.toString(10), "3", "there should be exactly 3 things at this stage");
            done(); // Test passed
        })
        .catch(done); 
    });

    // Get initial balances of first, second, and third account.
//    var account_one = accounts[1];
//    var account_two = accounts[2];
//    var account_tre = accounts[3];

//    var account_one_starting_balance;
//    var account_two_starting_balance;
//    var account_tre_starting_balance;

//    var account_one_ending_balance;
//    var account_two_ending_balance;
//    var account_tre_ending_balance;

//    var amount = 15;

//    console.log('accounts', accounts);
//    return split.getBalance.call(account_one).then(function(balance) {
//        account_one_starting_balance = balance.toNumber();
//        console.log('one start', account_one_starting_balance);
//        return split.getBalance.call(account_two);
//    }).then(function(balance) {
//        account_two_starting_balance = balance.toNumber();
//        return split.getBalance.call(account_tre);
//    }).then(function(balance) {
//        account_tre_starting_balance = balance.toNumber();
//        console.log('account_one', account_one);
//        console.log('account_two', account_two);
//        console.log('account_tre', account_tre);
//        console.log('amount', amount);
//        return split.sendCoin(amount);
//    }).then(function() {
//        return split.getBalance.call(account_one);
//    }).then(function(balance) {
//        account_one_ending_balance = balance.toNumber();
//        return split.getBalance.call(account_two);
//    }).then(function(balance) {
//        account_two_ending_balance = balance.toNumber();
//        return split.getBalance.call(account_tre);
//    }).then(function(balance) {
//        account_tre_ending_balance = balance.toNumber();
//
//    var sharedAmt = Math.floor(amount/2);
//    var CarolAmt = amount/2;
//    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
//    assert.equal(account_two_ending_balance, account_two_starting_balance + sharedAmt, "Amount wasn't correctly sent to Bob");
//    assert.equal(account_tre_ending_balance, account_tre_starting_balance + sharedAmt, "Amount wasn't correctly sent to Carol");
//    });
//  });
});
