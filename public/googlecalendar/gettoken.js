
function getToken()
{
  alert(decodeURIComponent('email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile'));
  var constUrl = "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&response_type=token&redirect_uri=http%3A//localhost:5000/redirect.html&client_id=6554177065-ibnesujovtu0tu774t0n1bth58qr5ag1.apps.googleusercontent.com";
  window.location.replace(constUrl);
  //returned value::http://localhost:5000/redirect.html#access_token=ya29.a0Adw1xeV4nOIwBU8lPOVKjY0L2ex_D4-voTfS26VSqk6DleoVoK0fiuOJUMn6eb0yDt-l6WHR1IMe-U_shpIsMPyCog0cjqsvMkhK6boiLOKpeqcoT8OPgnOE4FJgGnjyi2cNtTDZr8-doNZLBCmMUo09OxsHNPP-dq7S&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/calendar
}
async function getToken2()
{
  var consturl = "http://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&response_type=token&redirect_uri=http%3A//localhost:5000&client_id=6554177065-ibnesujovtu0tu774t0n1bth58qr5ag1.apps.googleusercontent.com";
  axios({
    method:'GET',
    url:consturl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    }).then((data) => {
      console.log(data); // No response
    })
}
 function getToken1()
  {
    var consturl = "http://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&response_type=token&redirect_uri=http%3A//localhost:5000/redirect.html&client_id=6554177065-ibnesujovtu0tu774t0n1bth58qr5ag1.apps.googleusercontent.com";
    const userAction = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      alert(8);
      console.log(myJson);
      }
      // const userAction = async () => {
      // const response = await fetch('https://oauth2.googleapis.com/token', {
      //   method: 'POST',
      //   body: {
      //     code:'4%2FwgGNrs3WLIp550cRsEBAGexW97BDRHTUaHc7cA1PoedUfzIVc3WpwM7PyESaKFn3CzIbTrMg7Sx5nawZz2pZXk0',
      //     client_id:'817714937779-vjtvcksvfh1mgskk3h82mjchossb34sh.apps.googleusercontent.com',
      //     client_secret:'mQzi6Oym5hAdkDNkMMuQyU2r',
      //     redirect_uri:'http%3A//localhost:8000',
      //     access_type:'offline',
      //     grant_type:'password'
      //   }, // string or object
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // });
      // const myJson = await response.json(); //extract JSON from the http response
      // // do something with myJson
      // alert(8);
      // console.log(myJson);
      // }
  }
