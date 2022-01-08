export class User {
  constructor(name, lastname, username, password) {
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.count = null;
  }

  setCount(count) {
    this.count = count;
  }

  validation(username, password) {
    if (this.password === password && this.username === username) return true;
    else return false;
  }

  entry(username, password) {
    if (this.validation(username, password)) {
      return true;
    } else {
      return false;
    }
  }
}

export class Count {
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
}

export class Operation {
  static DEPOSIT = "DEPOSITO";
  static TRANSFERENCIA = "TRANSFERECIA";
  static PAGOIMP="PAGOS-IMP";
  
  constructor(amount, type, date ) {
    this.amount = amount;
    this.type = type;
    this.date = date;
  }
}



