export class User {
  constructor(name, lastname, username) {
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.account = null;
  }

  setCount(account) {
    this.account = account;
  }
}

export class Account  {
  constructor(user, starAmount, accountNumber) {
    this.balance = starAmount || 0;
    this.operations = [];
    this.accountNumber = accountNumber;

    if (user) {
      user.setCount(this);
    }
  }
  static generateAccountNumber() {
    return Math.floor(Math.random() * 10000 + 10000);
  }

  addOperations(amount, type, date) {
    let operations = new Operation (amount, type, dayjs(date) );
    this.operations.push(operations);
    this.balance += amount;
  }

  getBalance(){
    let accountStatus = this.balance
    this.operations.forEach((operations)=>{
     accountStatus = accountStatus + operations.amount
    })
    return accountStatus
  }
  
  getOperations(){
    return this.operations.sort((ope1,ope2)=>{
      return ope2.fecha-ope1.fecha
    })

  }

  clearAccount(){
  this.operations = [];
  }
}

export class Operation {
  static DEPOSIT = "DEPOSITO";
  static TRANSFERENCIA = "TRANSFERENCIA";
  static PAGOIMP="PAGOS-IMP";
  
  constructor(amount, type, date ) {
    this.amount = amount;
    this.type = type;
    this.date = date;
  }
}



