import { Usuario, Cuenta, Operacion } from "./Clases.js";

var user = null;
var access = false;
const USER_KEY = "USER_KEY";
var cuenta1 = null;

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
}

function checkLogin() {
  const data = localStorage.getItem(USER_KEY);
  console.log(data);
  if (data) {
    access = true;
    const objData = JSON.parse(data);
    console.log(objData);
    closeModal();
    //showOperaciones(cuenta1)
  }
   var body = document.getElementsByTagName("body")[0];
   body.style.display = "block";
  
}

//Mostra modal de Ingreso
function openModal() {
  $("#sombra").fadeIn(100, () => {
    $("#modal").fadeIn(400);
  });
}

//Cerrar modal de ingreso
function closeModal() {
  $("#modal").fadeOut(400, () => {
    $("#dataForm").trigger("reset");
    $("#sombra").fadeOut(100);
  });
}

//Mostrar modal de deposito
function openDeposito(){
  $("#sombraD").fadeIn(100, () => {
    $("#modalD").fadeIn(400);
  });
}

//Cerrar modal de deposito
function closeDeposito(){
  $("#modald").fadeOut(400, () => {
    $("#formDeposito").trigger("reset");
    $("#sombrad").fadeOut(100);
  });
}
//Eventos

function setupEvent() {
  $("#btnModal").on("click", openModal)

  $("#close").on("click", closeModal)
 

  const form = document.getElementById("dataForm");
  form.addEventListener("submit", enviarFormulario);
}

function enviarFormulario(event) {
  const usuario1 = new Usuario("Ricardo", "Jhonson", "rick6", "1234");
  const cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  event.preventDefault();
  const form = document.getElementById("dataForm");
  const data = new FormData(form);

  const obtDataName = data.get("userName");
  const obtDataPass = data.get("password");

  if (usuario1.ingreso(obtDataName, obtDataPass)) {
    const userData = {
      name: usuario1.nombre,
      lastName: usuario1.apellido,
      userName: obtDataName,
      numeroCuenta: cuenta1.numeroCuenta,
    };

    const userDataString = JSON.stringify(userData);
    localStorage.setItem(USER_KEY, userDataString);

    dataForm.reset();
    const print = $("#nombre");
    userNameLabel(print, obtDataName);
    closeModal();
    showOperaciones(cuenta1);
    showSaldo();
    
  } else {
    alert("Password incorrecto");
    return;
  }
}

//Imprimir
function userNameLabel(container, nameUser) {
  container.append(`Bienvenido ${nameUser}`)
}

function initData() {
  const usuario1 = new Usuario("Ricardo", "Jhonson", "rick6", "1234");
  cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  // Agrego operaciones para demostracion
  cuenta1.addOperacion(100, Operacion.DEPOSITO, new Date(2020, 1, 24));
  cuenta1.addOperacion(500, Operacion.DEPOSITO, new Date(2020, 2, 14));
  cuenta1.addOperacion(1000, Operacion.DEPOSITO, new Date(2020, 3, 15));
  cuenta1.addOperacion(1850, Operacion.DEPOSITO, new Date(2020, 4, 8));
  cuenta1.addOperacion(3500, Operacion.DEPOSITO, new Date(2020, 5, 4));

  var body = document.getElementsByTagName("body")[0];
  body.style.display = "block";
}

function showOperaciones(cuenta1) {
  const container = $("#operaciones-body");
    cuenta1.obtenerHistorico().forEach((op) => {
    container.append(
      `<div class="operacion">
        <div class="data">
          <span class="fecha">${formatDate(op.fecha)}</span>
          <span class="tipo">${op.tipo}</span>
        </div>
        <div class="monto">$${op.monto}</div>
      </div>`
    );
  });

}
function showSaldo(){
  $("#saldo-cuenta").append(
    `Saldo $ ${cuenta1.getSaldo()}`
  )
}

function addCount(){
  $("#deposito").on("click", openDeposito)
  $("#closeD").on("click", closeDeposito)
}
//LLamados de los eventos
setupEvent();
initData();
checkLogin();
addCount();