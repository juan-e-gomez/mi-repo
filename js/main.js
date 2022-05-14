let guests = ['', 1, 2, 3, 4];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(lista, opcion){
    let elemento = "";
    /** operador ++ */
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

/** operador lógico OR */
const arrayBookings = JSON.parse(localStorage.getItem('my_bookings')) || [];

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
                /** const email = Swal.getPopup().querySelector('#email').value*/
                const email = Swal.getInput().value
                return { email: email }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    titleText: 'Enviada!',
                    icon: 'success',
                    text: `Tu solicitud ha sido enviada. Te contactaremos por mail a la brevedad (${result.value.email}).`});
                arrayBookings.push([localStorage.getItem('pasajeros'),localStorage.getItem('check-in'),localStorage.getItem('check-out'),days, result.value.email]);
                    for (let i= 0; i < arrayBookings.length; i++) {
                        console.log(arrayBookings[i]);
                        localStorage.setItem("my_bookings", JSON.stringify(arrayBookings));
                    }
                    while (arrayBookings.length > 4) {
                        console.log("Se han reservado por lo menos 5 estadías. Por favor accionar.");
                        console.log(JSON.parse(localStorage.getItem('my_bookings')));
                        break;
                    }
                    while (arrayBookings.some((days) => days > 10)) {
                        console.log("Atencion: hay solicitudes de estadía superiores a 10 días.")
                        break;
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
