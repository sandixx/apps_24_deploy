$(document).ready(function(){
    hideLoading();
});

var log = document.getElementById("etr");
log.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});

function login() {
    showLoading();
    var user = $('input[name="kzz"]').val();
    var pass= $('input[name="kzzr"]').val();
    var uz = "{{ url_for('auth_bp.login') }}";
    var csrf_token = "{{ csrf_token() }}";

    if (!user || !pass) {
        hideLoading();
        document.getElementById("msg").innerHTML = "Lengkapi Username & Password Terlebih Dahulu";
        $('#modal-msg').modal('toggle');
    } else {
        $.ajax({
            type: "POST",
            url: uz,
            headers : {"X-CSRFToken" : csrf_token},
            data: {"us" : user, "pw" : pass},
            success: function(response){
                if (response == 'ok') {
                    window.location = "{{ url_for('home_bp.home') }}";
                }
            },
            error: function(response){
                hideLoading();
                if (response.status == 999) {
                    document.getElementById("msg").innerHTML = response.responseText;
                    $('#modal-msg').modal('toggle');
                    hideLoading();
                } else if (response.status == 443) {
                    window.location = "{{ url_for('activation_bp.activation') }}";
                }
            }
        });
    }
}