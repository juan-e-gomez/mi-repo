let guests = ['', 1, 2, 3, 4];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(lista, opcion){
    let elemento = "";
    // operador ++
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
    let difference = Math.abs(checkOutDate - checkInDate);
    days = Number(difference/(1000 * 3600 * 24));
}

/// operador lógico OR
const arrayBookings = JSON.parse(localStorage.getItem('my_bookings')) || [];

function reloadLastDates(){
    const lastCheckIn = localStorage.getItem('check-in');
    document.getElementById('check-in').value = lastCheckIn;
    const lastCheckOut = localStorage.getItem('check-out');
    document.getElementById('check-out').value = lastCheckOut;
    const lastPaxQ = localStorage.getItem('pasajeros');
    document.getElementById('pasajeros').value = lastPaxQ;
}

document.onload = reloadLastDates();

function paxDetails(){
    getPax()
    getDates()
    if(checkIn.value,checkOut.value,pasajeros.value === null || checkIn.value,checkOut.value === "" || checkIn.value >= checkOut.value || pasajeros.value === "") {
        Toastify({
            text: "Seleccionar fechas válidas y cantidad de pasajeros para continuar.",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
        }).showToast();
    }        
    else{
        Swal.fire({
            titleText: '¿Confirmas la solicitud de reserva?',
            html: `${localStorage.getItem('pasajeros')} huésped/es, con ingreso el ${localStorage.getItem('check-in')} y egreso el ${localStorage.getItem('check-out')} (${days} noches en total)`,
            showCancelButton: true,
            input: 'email',
            inputPlaceholder: 'Ingresa tu e-mail',
            confirmButtonText: 'Enviar',
            confirmButtonColor: '#297d40',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                // si el input es un mail, se confirma
                const email = Swal.getInput().value
                return { email: email }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    titleText: 'Enviada!',
                    icon: 'success',
                    confirmButtonColor: '#297d40',
                    text: `Tu solicitud ha sido enviada. Te contactaremos por mail a la brevedad (${result.value.email}).`});
                // se carga la solicitud de reserva al array de bookings y este a su vez se guarda en my_bookings del localstorage
                arrayBookings.push([localStorage.getItem('pasajeros'),localStorage.getItem('check-in'),localStorage.getItem('check-out'),days, result.value.email]);
                    for (let i= 0; i < arrayBookings.length; i++) {
                        localStorage.setItem("my_bookings", JSON.stringify(arrayBookings));
                    }
                    if (arrayBookings.length > 4) {
                        sendBookings(); // si hay +5 reservas, se envia 'my_bookings' al administrador para que accione - ver email.js
                    }
                }
            }
        )
    }
}

let btnChange = document.getElementById("book")
btnChange.onmouseover = () => {
    book.innerHTML = "Let's go! 🚀";
}
btnChange.onmouseout = () => {
    book.innerHTML = "Search";
}
