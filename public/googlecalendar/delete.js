/**
 *  delete Event button click.
 */
function handleDeleteEventClick(eventId)
{
    var event = gapi.client.calendar.events.delete({
        "calendarId": 'primary', 
        "eventId": eventId
    }).execute();
    window.location.reload();
 }
 function handleDeleteEventClickUsingTokenClick(eventId)
       {
          var request = gapi.client.request({
            'method': 'DELETE',
            'path': '/calendar/v3/calendars/{calendarId}/events/{eventId}',
            'params': {'calendarId':'primary', 'eventId':eventId},
            'body':{}
          });
          request.execute(function(response) {
            console.log(response);
          });
          window.location.reload();
       } 