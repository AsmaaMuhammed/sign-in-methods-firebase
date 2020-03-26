  /**
       *  Create Recurring Event button click.
       */
      function handleCreateRecurringEventClick(event) {
        //alert(0);
        var event = {
          'summary': getTitle(),
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',

          "start": {
          "dateTime": "2020-03-13T09:00:00+02:00",
          "timeZone": "Europe/Zurich"
          },
          "end": {
          "dateTime": "2020-03-13T10:00:00+02:00",
          "timeZone": "Europe/Zurich"
          },
          "recurrence": [
          "RRULE:FREQ=WEEKLY;BYDAY=WE,TH,FR"
          ],

          'attendees': [
            {'email': 'asmaa@pidge.co'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          },
          
          "conferenceData": {
            "entryPoints": [
            {
              "entryPointType": "video",
              "uri": "https://meet.google.com/wix-pvpt-aaj",
              "label": "meet.google.com/wix-pvpt-njj"
            },
            {
              "entryPointType": "more",
              "uri": "https://tel.meet/wix-pvpt-njj?pin=1701789652855",
              "pin": "1701789652855"
            },
            {
              "entryPointType": "phone",
              "uri": "tel:+44-20-3873-7654",
              "label": "+44 20 3873 7654",
              "pin": "6054226"
            }
            ],
            "conferenceSolution": {
            "key": {
              "type": "hangoutsMeet"
            },
            "name": "Hangouts Meet",
            "iconUri": "https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v"
            },
            "conferenceId": "wix-pvpt-njj",
            "signature": "ADwwud9tLfjGQPpT7bdP8f3bq3DS"
          }

        };
        
        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'conferenceDataVersion':1,
          'sendUpdates': "all",
          'resource': event
        });
        request.execute(function(event) {
          console.log(event);
          //appendPre('Event created: ' + event.htmlLink);
        });
        listUpcomingEvents();
      }
        /**
       *  Create Event button click.
       */
       function handleCreateEventClick(event)
       {
        var event = {
          'summary': getTitle(),
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'date': getDate()
          },
          'end': {
            'date': getDate()
          },
          'attendees': [
            {'email': 'asmaa@pidge.co'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          },
          "conferenceData": {
            "entryPoints": [
            {
              "entryPointType": "video",
              "uri": "https://meet.google.com/wix-pvpt-aaj",
              "label": "meet.google.com/wix-pvpt-njj"
            },
            {
              "entryPointType": "more",
              "uri": "https://tel.meet/wix-pvpt-njj?pin=1701789652855",
              "pin": "1701789652855"
            },
            {
              "entryPointType": "phone",
              "uri": "tel:+44-20-3873-7654",
              "label": "+44 20 3873 7654",
              "pin": "6054226"
            }
            ],
            "conferenceSolution": {
            "key": {
              "type": "hangoutsMeet"
            },
            "name": "Hangouts Meet",
            "iconUri": "https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v"
            },
            "conferenceId": "wix-pvpt-njj",
            "signature": "ADwwud9tLfjGQPpT7bdP8f3bq3DS"
          }

        };
        
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'conferenceDataVersion':1,
              'sendUpdates': "all",
              'resource': event
            });
            request.execute(function(event) {
              console.log(event);
              appendPre('Event created: ' + event.htmlLink);
            });
          
            window.location.reload();
        }


       function createUsingToken()
       {
          var request = gapi.client.request({
            'method': 'POST',
            'path': '/calendar/v3/calendars/{calendarId}/events/',
            'params': {'calendarId':'primary'},
            'body':{
                'summary': getTitle(),//updated name
                'location': '800 Howard St., San Francisco, CA 94103',//updated loacation and so on ...
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'date': getDate()
                },
                'end': {
                  'date': getDate()
                }
              }
          });
          request.execute(function(response) {
            console.log(response);
          });
          window.location.reload();
       } 
