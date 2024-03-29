var clientId = '425026052887.apps.googleusercontent.com',
apiKey = 'AIzaSyASUlieEm5KbQJIcBZknjbB4nLkczj7HYM',
scopes = 'https://www.googleapis.com/auth/calendar';

//authorization, calls
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

//inmediate forces to display the google oauth window
function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
}

//if error or request, show
function handleAuthResult(authResult) {
  if (authResult) {//if  authorization granted 
    oauthGetCals();
    $('.main-ini').fadeOut(400,function(){$('#main_selCal').fadeIn(400)});
    return 1;
  } else {
    $('.main-ini .msj').html('Sorry, but there was an error login into your accont. Please try again')
    return 0; //error
  }
}

// get the calendars of the user
function oauthGetCals() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.calendarList.list();
    request.execute(function(resp) {
      showCalList(resp);
    });
  });
}

//process the calendars
showCalList = function(cals){
      padre = document.getElementById('container1');
      var mainCont = document.getElementById('selCal');
      var formu = document.createElement('form');
      var formSet = document.createElement('fieldset');
      if (cals.items.length){
        for(var i = 0 ; i< cals.items.length;i++){
          //calsList.push({'id' :cals.items[i].id,'nom':cals.items[i].summary});
          var list = document.createElement('li');
          var sp = document.createElement('input');
          var lbl = document.createElement('label');
          sp.setAttribute('type','checkbox');
          sp.id = cals.items[i].id;
          lbl.setAttribute('for',cals.items[i].id);
          var txt = document.createTextNode(cals.items[i].summary);
          lbl.appendChild(txt);
           list.appendChild(sp);
           list.appendChild(lbl);
           formSet.appendChild(list);
          }
      };
      formu.appendChild(formSet);
      mainCont.appendChild(formu);
}

//get the events of the selected calendars
function oauthGetEvts(calsListArray){
  var calsArray = new Array();
  gapi.client.load('calendar', 'v3', requestt);
  
    function requestt(){
      for (var j=0; j<calsListArray.length;j++){
        var request = gapi.client.calendar.events.list({
          'calendarId' : calsListArray[j],
          'fields' : 'description,items(attendees(displayName,email),created,creator,end,htmlLink,location,organizer,start,summary)',
        });
        request.execute(function(resp) {
          calsArray.push(resp);console.log(calsArray);
      });
    };
    orderCals(calsArray);
  };
  
}

//process the events
orderCals = function(calsArray){console.log(calsArray);
  for (var i=0; i<calsArray.length;i++){
  console.log(calsArray[i]);
  }
};

function handleClientLoad2() {
    //samplecal
 var cals ={"kind":"calendar#calendarList","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/CDSg_botpsxkGz7XK3TMkJehdOE\"","items":[{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/hgJeXBHgx9SSCxBxJwy9MHZbp9w\"","id":"sge7o3sh206gc3dn2us7m3ptps@group.calendar.google.com","summary":"Cineclub","description":"Eventos de nuestro maravilloso grupos, yeahh!!","location":"Madrid","timeZone":"UTC","colorId":"15","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/LzgoyxLJUf0fgGu5bPZgRxyfQGE\"","id":"8jrno3hguhqido11k0ouqt1u7o@group.calendar.google.com","summary":"Fiestas oficiales","description":"Dias no labolables en Espa�a o Madrid","timeZone":"America/Los_Angeles","colorId":"10","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/-HuRHQkdtw1750uyYTpifoseWPg\"","id":"l44t7c7tu96armti5giumv8apc@group.calendar.google.com","summary":"diario","description":"mis cosillas!","timeZone":"America/Los_Angeles","colorId":"11","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/l7OzISKXUO8DG6rI0DXZfY8XqWM\"","id":"iftti83ues6ictju3etv5i2ldev8n90m@import.calendar.google.com","summary":"betabeers","description":"Agenda betabeers","timeZone":"Europe/Madrid","colorId":"4","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/lJ9AqHPx-iezSgbxo4IN4N_v6uk\"","id":"lb09h4khrbtid0s82rklgh2vc5sedmve@import.calendar.google.com","summary":"Events - MadridJS","timeZone":"UTC","colorId":"9","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/acik4TkEeXiosK8wFW2m9iULfAA\"","id":"55nji9od5iadb0m9l9rlfi4mr4@group.calendar.google.com","summary":"cumplea�os","timeZone":"Europe/Paris","colorId":"17","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/5Tusv2IZk0ibHEIh1BocxL0GfEA\"","id":"9gs2v8lli7llp9l84o8jdf8o4s@group.calendar.google.com","summary":"Trabajo","timeZone":"UTC","colorId":"15","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/fg4O_mZNfN8FDh2KzPzv8lcgdps\"","id":"pmn8g74ndg1jcg8qfprl7blof6qf0s74@import.calendar.google.com","summary":"http://www.seriesly.com/JvnlpU4mYOlig3kLlHpuAndlyECgbEGv/calendar/","timeZone":"UTC","colorId":"16","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/6PHVIOClBbTBsvzCSD41uNp-nsc\"","id":"lilitpupi@gmail.com","summary":"Teresa_Almoguera","timeZone":"Europe/Madrid","colorId":"2","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/Six6LmbVuApfY0C1x0YM8x6uHAM\"","id":"tntubc1jtbr8fnlv01vd0rs9mfq68jkk@import.calendar.google.com","summary":"New and upcoming releases for last.fm user sHoWr","timeZone":"UTC","colorId":"12","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/jMcb50XuABx75lQ3xYAr1bolXJs\"","id":"da1kenobi@gmail.com","summary":"padaone kenobi","timeZone":"Europe/Paris","colorId":"18","selected":true,"accessRole":"owner","defaultReminders":[{"method":"email","minutes":10},{"method":"email","minutes":1440},{"method":"email","minutes":2880}]}],"result":{"kind":"calendar#calendarList","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/CDSg_botpsxkGz7XK3TMkJehdOE\"","items":[{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/hgJeXBHgx9SSCxBxJwy9MHZbp9w\"","id":"sge7o3sh206gc3dn2us7m3ptps@group.calendar.google.com","summary":"Cineclub","description":"Eventos de nuestro maravilloso grupos, yeahh!!","location":"Madrid","timeZone":"UTC","colorId":"15","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/LzgoyxLJUf0fgGu5bPZgRxyfQGE\"","id":"8jrno3hguhqido11k0ouqt1u7o@group.calendar.google.com","summary":"Fiestas oficiales","description":"Dias no labolables en Espa�a o Madrid","timeZone":"America/Los_Angeles","colorId":"10","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/-HuRHQkdtw1750uyYTpifoseWPg\"","id":"l44t7c7tu96armti5giumv8apc@group.calendar.google.com","summary":"diario","description":"mis cosillas!","timeZone":"America/Los_Angeles","colorId":"11","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/l7OzISKXUO8DG6rI0DXZfY8XqWM\"","id":"iftti83ues6ictju3etv5i2ldev8n90m@import.calendar.google.com","summary":"betabeers","description":"Agenda betabeers","timeZone":"Europe/Madrid","colorId":"4","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/lJ9AqHPx-iezSgbxo4IN4N_v6uk\"","id":"lb09h4khrbtid0s82rklgh2vc5sedmve@import.calendar.google.com","summary":"Events - MadridJS","timeZone":"UTC","colorId":"9","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/acik4TkEeXiosK8wFW2m9iULfAA\"","id":"55nji9od5iadb0m9l9rlfi4mr4@group.calendar.google.com","summary":"cumplea�os","timeZone":"Europe/Paris","colorId":"17","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/5Tusv2IZk0ibHEIh1BocxL0GfEA\"","id":"9gs2v8lli7llp9l84o8jdf8o4s@group.calendar.google.com","summary":"Trabajo","timeZone":"UTC","colorId":"15","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/fg4O_mZNfN8FDh2KzPzv8lcgdps\"","id":"pmn8g74ndg1jcg8qfprl7blof6qf0s74@import.calendar.google.com","summary":"http://www.seriesly.com/JvnlpU4mYOlig3kLlHpuAndlyECgbEGv/calendar/","timeZone":"UTC","colorId":"16","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/6PHVIOClBbTBsvzCSD41uNp-nsc\"","id":"lilitpupi@gmail.com","summary":"Teresa_Almoguera","timeZone":"Europe/Madrid","colorId":"2","selected":true,"accessRole":"owner"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/Six6LmbVuApfY0C1x0YM8x6uHAM\"","id":"tntubc1jtbr8fnlv01vd0rs9mfq68jkk@import.calendar.google.com","summary":"New and upcoming releases for last.fm user sHoWr","timeZone":"UTC","colorId":"12","selected":true,"accessRole":"reader"},{"kind":"calendar#calendarListEntry","etag":"\"bAVAAo617clHOxEsftLrtWpgjZQ/jMcb50XuABx75lQ3xYAr1bolXJs\"","id":"da1kenobi@gmail.com","summary":"padaone kenobi","timeZone":"Europe/Paris","colorId":"18","selected":true,"accessRole":"owner","defaultReminders":[{"method":"email","minutes":10},{"method":"email","minutes":1440},{"method":"email","minutes":2880}]}]}};
   showCalList(cals);
   return 1;
}

