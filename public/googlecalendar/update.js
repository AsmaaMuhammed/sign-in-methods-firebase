   /**
       *  Update Event button click.
       */
      function handleUpdateEventClick(eventId)
      {
        var event = gapi.client.calendar.events.get({
          "calendarId": 'primary', 
          "eventId": eventId
        });
        //console.log(event);
        event = {
        'summary': getTitle(),//updated name
        'location': '800 Howard St., San Francisco, CA 94103',//updated loacation and so on ...
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'date': getDate()
        },
        'end': {
          'date': getDate()
        },
        'attendees': [
          {'email': 'asmaa@pidge.co'},
          {'email': 'adnan@pidge.co'}
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
        
        var request = gapi.client.calendar.events.update({
          'calendarId': 'primary',
          'eventId':eventId,
          'conferenceDataVersion':1,
          'sendUpdates': "all",
          'resource': event
        });
        request.execute(function(event) {
          console.log(event);
        });
        window.location.reload();

      }
      
      function handleUpdateEventUsingTokenClick(eventId)
       {
          var request = gapi.client.request({
            'method': 'PUT',
            'path': '/calendar/v3/calendars/{calendarId}/events/{eventId}',
            'params': {'calendarId':'primary', 'eventId':eventId},
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

      async function handleUpdateEventUsingTokenClick1111(eventId)
      {
        // alert(GoogleAuth.currentUser.get());
        var event = gapi.client.calendar.events.get({
          "calendarId": 'primary', 
          "eventId": eventId
        });
        //console.log(event);
        event = {
        'summary': getTitle(),//updated name
        'location': '800 Howard St., San Francisco, CA 94103',//updated loacation and so on ...
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'date': getDate()
        },
        'end': {
          'date': getDate()
        },
        'attendees': [
          {'email': 'asmaa@pidge.co'},
          {'email': 'adnan@pidge.co'}
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
        var access_token='ya29.Il-_B67vp43wBQ1kh0Ear56AdU_CtSvtAwefhfGvQ-R_1pmFWLOVn_qaqa9xwpmLeOX_Nnz7oKIZ6vGUvcW_xwZjqZeV1E_DCorijYZOYRp5ckN8i3ZiiPTfS7gY1geGew'
       // var access_token='the-token';
        var token_type='Bearer';
        var expires_in=3599;
        const response = await fetch('https://www.googleapis.com/auth/calendar/v3/calendars/primary/events/'+eventId, {
          method: 'PATCH',
          body: event,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer '+access_token
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        alert(8);
        console.log(myJson);
      
        // axios.put('https://www.googleapis.com/auth/calendar/v3/calendars/primary/events/'+eventId, event, 
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Cache-Control': 'no-cache',
        //     'Authorization': 'Bearer '+access_token
        //   }
        // })
        // .then(response => { 
        //     console.log(response)
        //     const myJson = response.json(); //extract JSON from the http response
        //     // do something with myJson
        //     console.log(myJson);
        //     alert('event is updated');
        // })
        // .catch(error => {
        //     console.log(error.response)
        // });
    }

   