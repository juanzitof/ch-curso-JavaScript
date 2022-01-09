import { User, Account , Operation } from "./Clases.js";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss"
const USER_KEY = "USER_KEY";
var account = null;
var user = null;

function formatDate(date){
  return dayjs(date).format(DATE_FORMAT)
}

function checkLogin() {
  toggleLoading(true);
  const data = localStorage.getItem(USER_KEY);
  
  if (data) {
    const userData = JSON.parse(data);

    showUserName(`${userData.name}`);

    user = new User(userData.name, userData.lastName, userData.username);
    account = new Account (user, 0, userData.accountNumber);

    fetchOperations(()=>{
      showBalance();
      showOperations();

      changePage(`home-page`)
      toggleLoading(false)
    });
    
  } else {
    toggleLoading(false)
    changePage(`login-page`)
  }
}

// Inicializador de eventos
function setupEvent() {
  //Modal de ingreso
  var form = document.getElementById("dataForm");
  form.addEventListener("submit", onSubmitLogin);

  //Modal de deposito
  $("#open-deposit").on("click", openModalDeposit);
  $("#close-modal").on("click", closeModalDeposit);

  var formDeposit = document.getElementById("data-deposit");
  formDeposit.addEventListener("submit", onSubmitDeposit);


  // Botones 
  $("#btn-dollar").on("click", fetchDollar);
  $("#btn-logout").on("click", onLogout)
}

/** ---------------------- Eventos Principales ---------------------------- */
function onSubmitLogin(event) {
  event.preventDefault();
  const form = document.getElementById("dataForm");

  const data = new FormData(form);
  const dataUserName = data.get("userName");
  const dataPassword = data.get("password");
  
  toggleLoading(true);
  fetchLogin(dataUserName, dataPassword, (currentUser) => {

    if (currentUser) {
      user = new User(currentUser.name, currentUser.lastname, currentUser.username, currentUser.password);
      account = new Account (user, 0, currentUser.accountNumber);

      const userData = {
        name: user.name,
        lastName: user.lastname,
        username: dataUserName,
        accountNumber: account.accountNumber,
      };

      var userDataString = JSON.stringify(userData);
      localStorage.setItem(USER_KEY, userDataString);

      dataForm.reset();
    
      showUserName(`${userData.name}`);

      fetchOperations(()=> {
        showBalance();
        showOperations();
        changePage(`home-page`);
        toggleLoading(false);
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password Incorrecto!',
        footer: 'Intente nuevamente!'
      })
    }
  });
}


function onLogout(){
  $("#operations").html("")
  toggleLoading(true);
  const deleteStorage = localStorage.clear();
  changePage(`login-page`);
  toggleLoading(false);
  account.clearAccount();
}


function onSubmitDeposit(event) {
  event.preventDefault();
  const formDeposit = document.getElementById("data-deposit");
  const dataDeposit = new FormData(formDeposit);
  const deposit = dataDeposit.get("amount-Deposit");
  
  if(deposit && deposit !== "" && !isNaN(deposit)){
    const deposit = parseInt($("#amount-Deposit").val());
    
    account.addOperations(deposit, Operation.DEPOSIT, new Date())
    showOperations();
    showBalance();
  }
  closeModalDeposit();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Su deposito a sido exitoso',
    showConfirmButton: false,
    timer: 1500
  })
}

/** ---------------------- API Functions ------------------------------ */
function fetchLogin(username, password, onFinish){
  $.get("../data/usuarios.json", (users) => {
    const user = users.find(user => user.username === username)

    if(user && user.password === password){
      onFinish(user) 
    }else{
      onFinish(false)
    }
  })
} 

function fetchOperations(onFinish) {
  $.get("../data/operaciones.json", (data) => {
    data
      .filter(op=> op.account === account.accountNumber)
      .forEach(op => account.addOperations(op.amount, op.type, op.date ))

    setTimeout(() => {
      onFinish()
    }, 1000)
  })
}

function fetchDollar() {
  const urlDolar = "https://api.bluelytics.com.ar/v2/latest";
  $.ajax({
    method: "GET",
    url: urlDolar,
    success: function (valorDolar) {
      $("#operation-dollar").html(
        `<div class="style-dolar"><h1>Dolar oficial venta $ ${valorDolar.oficial.value_sell}</h1>
        <h1>Dolar oficial compra $ ${valorDolar.oficial.value_buy}</h1>
      <h1>Dolar blue venta  $ ${valorDolar.blue.value_sell}</h1>
      <h1>Dolar blue compra  $ ${valorDolar.blue.value_buy}</h1></div>`
      );
    },
  });
}


/** ---------------------- UI Functions ------------------------------ */
function changePage(idPage) {
  $(".page").fadeOut(500, () => {
    $(`#${idPage}`).fadeIn(500);
  })
}

const toggleLoading = (visible) => {
  if (visible) {
    $('#main-loading').fadeIn()
  } else {
    $('#main-loading').fadeOut()
  }
}

//Mostrar modal de deposito
function openModalDeposit() {
  $("#shadow").fadeIn(100, () => {
    $("#modal-deposit").fadeIn(400);
  });
}

//Cerrar modal de deposito
function closeModalDeposit() {
  $("#modal-deposit").fadeOut(400, () => {
    $("#data-deposit").trigger("reset");
    $("#shadow").fadeOut(100);
  });
}

//Imprimir
function showUserName(name) {
  $("#name-body").html(`Bienvenido ${name}`);
}

function showBalance() {
  const roundBalance = Math.round(account.balance * 100) / 100
  $("#balance-count").html(`$${roundBalance}`);
}

function showOperations(){
  $("#operations").html("")
  if(account.operations.length == 0){
    $("#operations").append(
      `<div class="operation-empty">
      <h1 class="msg-empty"> No hay operaciones </h1>
      </div>`
      );
  }
  account.getOperations().forEach((op) => {
    $("#operations").append(
      `<div class="operacion">
        <div class="data">
          <span class="fecha">${formatDate(op.date)}</span>
          <span class="tipo">${op.type}</span>
        </div>
        <div class="monto">$${op.amount}</div>
      </div>`
    );
  });
}

//LLamados de los eventos
setupEvent();
checkLogin();