let guests = ['', 1, 2, 3, 4];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(lista, opcion){
    let elemento = "";
    for (let i = 0; i < lista.length; i++){
        elemento += "<option>" + lista[i] + "</option>";
    }
    opcion.innerHTML = elemento
} 
opciones(guests, pasajeros)

function getPax(){
    let pasajeroSelect = document.getElementById("pasajeros");
    localStorage.setItem(pasajeroSelect.id, pasajeroSelect.value)
}

// dates
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");

function getDates(){   
    localStorage.setItem(checkIn.id, checkIn.value);
    localStorage.setItem(checkOut.id, checkOut.value);
    let checkInDate = new Date(checkIn.value);
    let checkOutDate = new Date(checkOut.value);
    let difference= Math.abs(checkOutDate - checkInDate);
    days = difference/(1000 * 3600 * 24);
}

let searchStatus = document.getElementById("searchboxstatus")

const arrayBookings = [];

function paxDetails(){
    getPax()
    getDates()
    
    if(checkIn.value,checkOut.value,pasajeros.value === null || checkIn.value,checkOut.value,pasajeros.value === '')
        searchStatus.innerText = "Seleccionar fechas y cantidad de pasajeros para continuar.";
    else{
        searchStatus.innerText = `Enviada solicitud de reserva para ${localStorage.getItem('pasajeros')} pasajero/s.\n Ingreso día ${localStorage.getItem('check-in')}\n Egreso día ${localStorage.getItem('check-out')}\nNúmero total de noches: ${days}`;
        console.log("Nuevo booking ingresado.\nDebajo arrays con las solicitudes acumuladas, expresadas en cantidad de pasajeros, check-in, check-out y días de estadía.");
    }

    arrayBookings.push([localStorage.getItem('pasajeros'),localStorage.getItem('check-in'),localStorage.getItem('check-out'),days]);
    for (let i= 0; i < arrayBookings.length; i++) {
        console.log(arrayBookings[i]);
        localStorage.setItem("my_bookings", JSON.stringify(arrayBookings));
    }
    while (arrayBookings.length > 4){
        console.log("Se han reservado al menos 5 estadías. Por favor accionar.");
        console.log(JSON.parse(localStorage.getItem('my_bookings')));
        break;}
    }
    while (arrayBookings.some((days) => days > 10)) {
        console.log("Atencion: hay solicitudes de estadía superiores a 10 días.")
        break;}


let btnChange = document.getElementById("book")
btnChange.onmouseover = () => {
    book.innerHTML = "Let's go! 🚀";
}
btnChange.onmouseout = () => {
    book.innerHTML = "Search";
}
