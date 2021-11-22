var userNameValidate = false;
var userPasswordValidate = false;

do {
  var userName = prompt("Ingrese su nombre");
  userNameValidate = userName !== "" || !isNaN (userName);
  console.log(`Ingreso el nombre de ${userName}`)
 
  var userPassword = parseInt(prompt("Ingrese su clave"));
  userPasswordValidate = !isNaN (userPassword);
  console.log(`Ingreso la clave ${userPassword}`)
 

  if (userNameValidate && userPasswordValidate) {
    alert(
      `La persona con nombre: ${userName} y contraseña ${userPassword} ingreso exitosamente!`
    );
    break;
  }
} while (!userNameValidate || !userPasswordValidate);
