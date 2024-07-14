async function resend() {
    showLoading();
    var email = document.getElementById("email").value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (email.match(mailformat)) {
        var fd = new FormData();
        fd.append("email", email);

        $.ajax({
            type: "POST",
            url: "{{ url_for('activation_bp.activation') }}",
            headers : {"X-CSRFToken" : csrf_token},
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                document.getElementById("email").value = "";
                hideLoading();
                document.getElementById('email').style.background = 'white';
                document.getElementById('email').style.color = '#495057';
                document.getElementById("msg").innerHTML = "Email Telah Terkirim <br>Silahkan Cek Email Anda Untuk Aktivasi";
                $('#modal-msg').modal('toggle');
            },
            error: function(response){
                hideLoading();
                if (response.status == 999) {
                    document.getElementById("msg").innerHTML = response.responseText;
                    $('#modal-msg').modal('toggle');
                }
            }
        });
    } else {
        hideLoading();
        notif("warning", "Email Tidak Dapat Digunakan");
    }
}