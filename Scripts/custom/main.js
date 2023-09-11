function login() {
    
    var username    = $('#username').val();
    var password    = $('#pwd').val();

    if (username !== '' && username !== undefined && password !== '' && password !== undefined) {        
        var dataToSend  = {
                        "username": username,
                        "password": password
        };

        $.ajax({
            type:           "POST",
            url:            "/User/Login",
            data:           JSON.stringify(dataToSend),
            contentType:    "application/json; charset=utf-8",
            dataType:       "json",
            success:        function (result) {
                            if(result !== 'Invalid username or password !!')
                                window.location.href = result;
                            else
                                alert(result);
            }
        });
    }
}