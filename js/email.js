(function () {
    emailjs.init("G8IWB9fQcIV_x3idd");
})();

function sendmail() {
    let fullName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;

        var contactParams = {
            from_name: fullName,
            to_email: userEmail,
            message: userMessage
        };

        emailjs.send('gmailMessage', 'template_5sc5t37', contactParams).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
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
            console.log('FAILED...', error);
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