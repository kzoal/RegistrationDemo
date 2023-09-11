function allowDelete() {
    var $checkboxes  = $('input[id*=chkRegistration]');
    var checkedCount = $checkboxes.filter(':checked').length;    
    checkedCount > 0 ? $('#deleteRegistration').removeAttr('disabled') : $('#deleteRegistration').attr('disabled', 'disabled');
}

function updateRegistration() {

    if (validateRegistrationChanges() && confirm("Are you sure you want to update the information?")) {
        var registrationId  = $('#Id').val();
        var name            = $('#Name').val();
        var phone           = $('#Phone').val();
        var email           = $('#Email').val();
        var address         = $('textarea[id="Address"]').val();
        var createdOn       = $('#CreatedOn').val();
        var active          = $('#Active').val();

        var updateReg       = { "id": registrationId, "name": name, "phone": phone, "email": email, "address": address, "CreatedOn": createdOn, "Active": active };

        $.ajax({
            type:           "POST",
            url:            "/Registration/Edit",
            data:           JSON.stringify(updateReg),
            contentType:    "application/json; charset=utf-8",
            dataType:       "json",
            success:        function (response) {
                                if (response.result == true) {
                                    alert("Update successful.");
                                    location = location.href;
                                }
                                else {
                                    alert(response.error);
                                }
            }
        });
    }
}

function deleteRegistration() {

    if (confirm("Are you sure you want to delete this registration?")) {
        $.ajax({
            type:           "POST",
            url:            "Delete",
            data:           JSON.stringify({ "id": $('#Id').val() }),
            contentType:    "application/json; charset=utf-8",
            dataType:       "json",
            success:        function (response) {
                                if (response.result == true) {
                                    alert("Delete successful.");
                                    location = location.href;
                                }
                                else {
                                    alert(response.error);
                                }
            }
        });

    }
}

function saveRegistration() {
    
    $("#frmRegister").validate({
        invalidHandler: function (event, validator) {            
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1
                    ? 'Some missing data.'
                    : 'You missed ' + errors + ' fields have been highlighted';
                $("div.error span").html(message);
                $("div.error").show();
            } else {
                $("div.error").hide();
            }
        }
    });
    
    var isValidForm         = $('#frmRegister').valid();
    
    if (isValidForm && confirm("Are you sure you want to save this registration?")) {
        var name            = $('#Name').val();
        var phone           = $('#Phone').val();
        var email           = $('#Email').val();
        var address         = $('textarea[id="Address"]').val();
        var username        = $('#Username').val();
        var password        = $('#pwd').val();       

        var dataToSend      = {
                            "id": -1,
                            "name": name,
                            "phone": phone,
                            "email": email,
                            "address": address,
                            "username": username,
                            "password": password
        };

        $.ajax({
            type:           "POST",
            url:            "Save",
            data:           JSON.stringify(dataToSend),
            contentType:    "application/json; charset=utf-8",
            dataType:       "json",
            success:        function (response) {
                                if (response.result == true) {
                                    alert("Registration created successfully, please login.");
                                    location = "/";
                                }
                                else {
                                    alert(response.error);
                                }
            }
        });
    }
}

function deleteSelected() {
    if (confirm("Are you sure you want to delete the selected registration(s)?")) {

        var registrationsToDelete   = '';

        $('[id*=chkRegistration]').each(function () {
            if ($(this)[0].checked) {                
                registrationsToDelete = registrationsToDelete + $(this)[0].name + ',';
            }           
        });

        var dataToSend              = {
            ids:                    registrationsToDelete
        };
        
        $.ajax({
            type:               "POST",
            url:                "/Registration/Delete",
            data:               JSON.stringify(dataToSend),
            contentType:        "application/json; charset=utf-8",
            dataType:           "json",
            success:            function (response) {
                                if (response.result == true) {
                                    alert("Delete successful.");
                                    location = location.href;
                                }
                                else {
                                    alert(response.error);
                                }
            }
        });
    }
}

function validatePassword() {
    var password        = $('#pwd').val();
    var confirmPassword = $('#confirmpwd').val();        
    $('#passwordDifferenceMessage').hide();
    if (password != confirmPassword) {
        $('#passwordDifferenceMessage').html("Passwords don't match.");        
        $('#passwordDifferenceMessage').attr("style", "display: block;");
        $('#btnSave').attr('disabled', 'disabled');
    } else {
        $('#passwordDifferenceMessage').html('');
        $('#passwordDifferenceMessage').attr("style", "display: none;");
        $('#btnSave').removeAttr('disabled');
    }
}

function openConfirmPwdBeforeDelete() {    
    $("#confirmPwdBeforeDelete").modal("show");    
}

function enableButton() {
    if ($('#pwd').val() !== '' && $('#pwd').val() !== undefined) {
        $('#confirmPwd').removeAttr('disabled');
    }
    else {
        $('#confirmPwd').attr('disabled', 'disabled');
    }
}

function verifyPassword() {

    var dataToSend              = {
            username:           $('#username').val(),
            password:           $('#pwd').val(),
    };
        
        $.ajax({
            type:               "POST",
            url:                "/User/VerifyUser",
            data:               JSON.stringify(dataToSend),
            contentType:        "application/json; charset=utf-8",
            dataType:           "json",
            success:            function (response) {
                                if (response.result == true) {
                                    $("#confirmPwdBeforeDelete").modal("hide");
                                    deleteSelected();
                                }
                                else {
                                    alert('Invalid password, please try again.');
                                }
            }
        });
}

function validateRegistrationChanges() {    
    var name            = $('#Name').val();
    var phone           = $('#Phone').val();
    var email           = $('#Email').val();
    var address         = $('textarea[id="Address"]').val();    
    var invalidEntriesArr = [];

    if (name === '' || name === undefined){
        invalidEntriesArr.push("Name is required. \n");
    }

    if (name.length > 100) {
        invalidEntriesArr.push("Only 100 characters allowed in name. \n");
    }

    if (phone.length > 30) {
        invalidEntriesArr.push("Only 30 characters allowed in phone number. \n");
    }

    if (address.length > 2500) {
        invalidEntriesArr.push("Only 30 characters allowed in address. \n");
    }

    if (email.length > 100) {
        invalidEntriesArr.push("Only 30 characters allowed in email.");
    }

    if (invalidEntriesArr.length > 0) {
        alert('Please correct the following errors on: \n' + invalidEntriesArr.join(' '));
        return false;
    }
    else
        return true;
}