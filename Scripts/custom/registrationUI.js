function viewRegistration(popupTitle, id, mode) {

    var x           = $("#registrationPopup");
    var popupWidth  = 400;

    if (mode === 0) { // VIEW Registration
        $("#btnUpdate").hide();
        x.load("/Registration/Edit?Id=" + id, function () {
            x.dialog({
                modal: true, title: popupTitle, resizable: false, width: popupWidth
            });            
        });
    }
    else if (mode === 1) { // EDIT Registration
        x.load("/Registration/Edit?Id=" + id, function () {
            x.dialog({
                modal: true, title: popupTitle, resizable: false, width: popupWidth
            });
        });        
    }
}