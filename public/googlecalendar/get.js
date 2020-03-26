function displayDetails(eventId)
{
    var request = gapi.client.request({
      'method': 'GET',
      'path': '/calendar/v3/calendars/{calendarId}/events/{eventId}',
      'params': {'calendarId':'primary', 'eventId':eventId},
      'body':{}
    });
    request.execute(function(response) {
      console.log(response);
    });
}