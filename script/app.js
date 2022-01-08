import { User, Count, Operation } from "./Clases.js";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss"
var user = null;
var access = false;
const USER_KEY = "USER_KEY";
var count1 = null;
var user1 = null;


function formatDate(date){
  return dayjs(date).format(DATE_FORMAT)
}

function checkLogin() {
  toggleLoading(true);

  const data = localStorage.getItem(USER_KEY);
  
  if (data) {
    access = true;
    const objData = JSON.parse(data);

    printuserNameLabel(`${objData.name}`);

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
function openModalDeposit() {
  $("#shadow").fadeIn(100, () => {
    $("#modal-deposit").fadeIn(400);
  });
}

//Cerrar modal de deposito
function closeDeposit() {
  $("#modal-deposit").fadeOut(400, () => {
    $("#data-deposit").trigger("reset");
    $("#shadow").fadeOut(100);
  });
}

//Eventos

function setupEvent() {
  //Modal de ingreso
  var form = document.getElementById("dataForm");
  form.addEventListener("submit", seddingForm);

  //Modal de deposito
  $("#open-deposit").on("click", openModalDeposit);
  $("#close-modal").on("click", closeDeposit);

  var formDeposit = document.getElementById("data-deposit");
  formDeposit.addEventListener("submit", seddingDeposit);


  // Botones 
  $("#consult-balance").on("click", showBalance);
  $("#btn-dollar").on("click", consultDollar);
  //$("#btn-logout").on("click", loginOut)
}

function seddingForm(event) {
  event.preventDefault();
  const form = document.getElementById("dataForm");

  const data = new FormData(form);
  const dataUserName = data.get("userName");
  const dataPassword = data.get("password");

  if (user1.entry(dataUserName, dataPassword)) {
    toggleLoading(true);
    const userData = {
      name: user1.name,
      lastname: user1.lastname,
      username: dataUserName,
      accountNumber: count1.accountNumber,
    };

    var userDataString = JSON.stringify(userData);
    localStorage.setItem(USER_KEY, userDataString);

    dataForm.reset();
    
    
    printuserNameLabel(`${userData.name} ${userData.lastname}`);
    
    closeModal();
    fetchOperations(()=> {
      showBalance();
      showOperations();
      changePage(`home-page`);
      toggleLoading(false);
    });
      

  } else {
    alert("Password incorrecto");
    return;
  }
}

function fetchOperations(onFinish) {
  $.get("../data/operaciones.json", (data) => {
    data.forEach(op => count1.addOperations(op.amount, op.type, op.date ))

    setTimeout(() => {
      onFinish()
    }, 1000)
    
})
}

function seddingDeposit(event) {
  event.preventDefault();
  const formDeposit = document.getElementById("data-deposit");
  const dataDeposit = new FormData(formDeposit);
  const deposit = dataDeposit.get("amount-Deposit");
  
  if(deposit && deposit !== "" && !isNaN(deposit)){
    const deposit = parseInt($("#amount-Deposit").val());
    
    count1.addOperations(deposit, Operation.DEPOSIT, new Date())
    showOperations();
  }
  closeDeposit();
  alert("Su deposito a sigo exitoso!");
}

//Imprimir
function printuserNameLabel(name) {
  $("#name-body").html(`Bienvenido ${name}`);
}

function showOperations(){
  $("#operations").html("")
    count1.getOperations().forEach((op) => {
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

function initData() {
  user1 = new User("Ricardo", "Jhonson", "rick6", "1234");
  count1 = new Count(user1, 0, Count.generateAccountNumber());
}


function showBalance() {
  $("#balance-count").html(`$${count1.balance}`);
}

//LLamado a la api
function consultDollar() {
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

const toggleLoading = (visible) => {
  if (visible) {
    $('#main-loading').fadeIn()
  } else {
    $('#main-loading').fadeOut()
  }
}

//  function loginOut (){
//   toggleLoading(true);
//   localStorage.setItem(USER_KEY, null);
//   changePage(`home-page`);
//   changePage(`login-page`);
//   toggleLoading(false);

// }

//LLamados de los eventos
initData();
setupEvent();
checkLogin();

function changePage(idPage) {
  $(".page").fadeOut(500, () => {
    $(`#${idPage}`).fadeIn(500);
  })
}

// logout 
//    - mostrar loading
//    - limpiar local Storage
//    - ocultar home-page
//    - mostrar login-page
//    - ocultar loading
   