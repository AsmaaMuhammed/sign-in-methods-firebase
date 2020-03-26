function CreateCalendar(){
    var request = gapi.client.request({
        'method': 'POST',
        'path': '/calendar/v3/calendars',
        'params': {},
        'body':{'summary':'testCalendar1'}
    });
    request.execute(function(response) {
        console.log(response);
    });
}