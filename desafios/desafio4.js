var userNameValidate = false;
var userPasswValidate = false;
var userAccountNumValidate = false;
var accountBalance = 1500000;

function formWelc() {
  do {
    var userName = prompt("Ingrese su nombre");
    userNameValidate = userName !== "" || !isNaN(userName);
    console.log(`Ingreso el nombre de ${userName}`);

    var userPassword = parseInt(prompt("Ingrese su clave"));
    userPasswValidate = !isNaN(userPassword);
    console.log(`Ingreso la clave ${userPassword}`);

    var userAccountNumber = parseInt(prompt("Ingrese su numero de cuenta"));
    userAccountNumValidate = !isNaN(userAccountNumber);
    console.log(`Ingreso el numero de cuenta ${userAccountNumber}`);

    if (userNameValidate && userPasswValidate && userAccountNumValidate) {
      alert(
        `La persona con nombre: ${userName}, contraseña ${userPassword} y numero de cuenta ${userAccountNumber} ingreso exitosamente!`
      );
      break;
    }
  } while (!userNameValidate || !userPasswordValidate);
}

function deposit() {
  var addDeposit = parseFloat(prompt("Ingrese el valor a depositar"));
  result = accountBalance + addDeposit;
  console.log(`Ingreso ${result} a depositar en su cuenta`);
}


formWelc();
deposit();
