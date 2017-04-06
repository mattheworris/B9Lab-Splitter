contract('Splitter', function(accounts) {
  it("should put 15000 Ether in the first account", function() {
    var split = Splitter.deployed();

    return split.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 15000, "15000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var split = Splitter.deployed();
    var splitCoinBalance;
    var splitCoinEthBalance;

    return split.getBalance.call(accounts[0]).then(function(outCoinBalance) {
      splitCoinBalance = outCoinBalance.toNumber();
      return split.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      splitCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(splitCoinEthBalance, 2 * splitCoinBalance, "Library function returned unexpeced function, linkage may be broken");
    });
  });
  it("should split coin correctly", function() {
    var split = Splitter.deployed();

    // Get initial balances of first, second, and third account.
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_tre = accounts[2];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_tre_starting_balance;

    var account_one_ending_balance;
    var account_two_ending_balance;
    var account_tre_ending_balance;

    var amount = 15;

    return split.getBalance.call(account_one).then(function(balance) {
        account_one_starting_balance = balance.toNumber();
        return split.getBalance.call(account_two);
    }).then(function(balance) {
        account_two_starting_balance = balance.toNumber();
        return split.getBalance.call(account_tre);
    }).then(function(balance) {
        account_tre_starting_balance = balance.toNumber();
        return split.sendCoin(account_two, account_tre, amount, {from: account_one});
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

    var sharedAmt = amount/2;
    var CarolAmt = amount/2;
    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + sharedAmt, "Amount wasn't correctly sent to Bob");
    assert.equal(account_tre_ending_balance, account_tre_starting_balance + CarolAmt, "Amount wasn't correctly sent to Carol");
    });
  });
});
