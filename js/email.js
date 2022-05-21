(function () {
    emailjs.init("user_G8IWB9fQcIV_x3idd");
})();

function sendmail() {
    let fullName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;

        var contactParams = {
            from_name: fullName,
            from_email: userEmail,
            message: userMessage
        };

        emailjs.send('service_gmailMessage', 'template_template_5sc5t37', contactParams).then(function (res){})
}