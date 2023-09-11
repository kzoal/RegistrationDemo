function loadDataFromAPI() {

    $.ajax({
        url:        'https://randomuser.me/api/',
        dataType:   'json',
        success:    function (data) {                    
                    $('#Name').val(data.results[0].name.first + ' ' + data.results[0].name.last);
                    $('#Phone').val(data.results[0].phone);
                    $('#Email').val(data.results[0].email);
                    $('#Username').val(data.results[0].login.username);
                    $('#pwd').val(data.results[0].login.password);
                    $('#confirmpwd').val(data.results[0].login.password);
                    $('#Address').val(data.results[0].location.street.number + ' ' + data.results[0].location.street.name + ' ' + data.results[0].location.city + ' '
                    + data.results[0].location.state + ' ' + data.results[0].location.country + ' ' + data.results[0].location.postcode);

                    $('#btnSave').removeAttr('disabled');
        }
    });
}