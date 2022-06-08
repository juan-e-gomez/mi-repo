(function () {
    emailjs.init("G8IWB9fQcIV_x3idd");
})();

// usada en contacto.html
function sendmail() {
    let fullName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;

        let contactParams = {
            from_name: fullName,
            to_email: userEmail,
            message: userMessage
        };

        emailjs.send('gmailMessage', 'template_5sc5t37', contactParams).then(function(response) {
            Toastify({
                text: "Tu solicitud de contacto ha sido enviada.",
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
        }, function(error) {
            Toastify({
                text: "Hubo un problema con el envío del mensaje.",
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
        });
}

// usada en index.html - al llegar a las 5 solicitudes de reserva en my_bookings del localstorage, se envia mail al administrador con las solicitudes
function sendBookings() {
    let adminEmail = "{{from_email}}";
    let adminName = "Tiny House Pinamar Administrator";
    let bookingsList = localStorage.getItem('my_bookings');

        let sendBookingsParams = {
            from_name: adminName,
            to_email: adminEmail,
            message: bookingsList
        };

        emailjs.send('gmailMessage', 'template_5sc5t37', sendBookingsParams).then(function(response) {
            console.log('Success!', response.status, response.text);
        }, function(error) {
            console.log('Error', error);
        });
}