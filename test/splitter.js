contract('Splitter', function(accounts) {
    
  it("should split coin correctly", function() {
    var split = Splitter.deployed();

    // Get initial balances of first, second, and third account.
    var account_one = accounts[1];
    var account_two = accounts[2];
    var account_tre = accounts[3];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_tre_starting_balance;

    var account_one_ending_balance;
    var account_two_ending_balance;
    var account_tre_ending_balance;

    var amount = 15;

    console.log('accounts', accounts);
    return split.getBalance.call(account_one).then(function(balance) {
        account_one_starting_balance = balance.toNumber();
        console.log('one start', account_one_starting_balance);
        return split.getBalance.call(account_two);
    }).then(function(balance) {
        account_two_starting_balance = balance.toNumber();
        return split.getBalance.call(account_tre);
    }).then(function(balance) {
        account_tre_starting_balance = balance.toNumber();
        console.log('account_one', account_one);
        console.log('account_two', account_two);
        console.log('account_tre', account_tre);
        console.log('amount', amount);
        return split.sendCoin(amount);
    }).then(function() {
        return split.getBalance.call(account_one);
    }).then(function(balance) {
        account_one_ending_balance = balance.toNumber();
        return split.getBalance.call(account_two);
    }).then(function(balance) {
        account_two_ending_balance = balance.toNumber();
        return split.getBalance.call(account_tre);
    }).then(function(balance) {
        account_tre_ending_balance = balance.toNumber();

    var sharedAmt = Math.floor(amount/2);
    var CarolAmt = amount/2;
    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + sharedAmt, "Amount wasn't correctly sent to Bob");
    assert.equal(account_tre_ending_balance, account_tre_starting_balance + sharedAmt, "Amount wasn't correctly sent to Carol");
    });
  });
});
