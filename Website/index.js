class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    getBalance() {
        return this.balance;
    }
    debit(amount) {
        if (amount > this.balance) return false; 
        this.balance -= amount; 
        return true;
    }
}

class Customer {
    constructor(name, accountNumber, pinCode, bankAccount) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.pinCode = pinCode;
        this.bankAccount = bankAccount;
    }
    authenticate(enteredPin) {
        return this.pinCode === enteredPin; 
    }
}

class ATM {
    constructor(location) {
        this.location = location;
    }
    show(customer) {
        console.log(`Welcome ${customer.name}, your account number is ${customer.accountNumber} and your balance is ${customer.bankAccount.getBalance().toFixed(2)}`); 
    }
}

class Withdrawal {
    constructor(bankAccount) {
        this.bankAccount = bankAccount;
    }
    withdraw(amount) {
        return this.bankAccount.debit(amount);
    }
}

let bankAccount = new BankAccount('123456789', 100000);
let customer = new Customer('Tahir Ozasik', '123456789', 1234, bankAccount);


let accountNumberDisplay = document.getElementById('accountNumberDisplay');
accountNumberDisplay.textContent = customer.accountNumber;
let nameDisplay = document.getElementById('name');
nameDisplay.textContent = customer.name;
let balanceDisplay = document.getElementById('myBalance');
balanceDisplay.value = customer.bankAccount.getBalance().toFixed(2);


document.getElementById('withdrawbutton').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('myAmount').value);
    let enteredPin = parseInt(document.getElementById('pinCodeInput').value);
    let message = document.querySelector('p:nth-of-type(3)');

    if (!customer.authenticate(enteredPin)){
        message.textContent = "Incorrect PIN"; 
        message.style.color = "red"; 
        return; 
    }

    if (isNaN(amount) || amount <= 0){
        message.textContent = "Invalid input"; 
        message.style.color = "red"; 
    } else if (customer.bankAccount.debit(amount)) {
        balanceDisplay.value = customer.bankAccount.getBalance().toFixed(2);
        message.textContent = "Withdrawal successful"; 
        message.style.color = "green";
    } else {
        message.textContent = "Insufficient balance"; 
        message.style.color = "red"; 
    }
});


document.getElementById('cancelbutton').addEventListener('click', () =>{
    document.getElementById('myAmount').value = "";
    document.querySelector('p:nth-of-type(3)').textContent = "Process finished"; 
});


let atm = new ATM('Downtown Branch');
atm.show(customer);
let withdrawal = new Withdrawal(bankAccount);
