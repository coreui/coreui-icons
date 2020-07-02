'use strict'

$(document).ready(function() {
  $.getJSON('https://pro.ip-api.com/json/?key=EEKS6bLi6D91G1p', function(data) {
    var countryCode = data.countryCode;
    if (countryCode == 'IN') {
      //
    } else if (countryCode == 'BR') {
      //
    } else {
      $(document).mousemove(function(e) {
        if(e.pageY <= 5) {
          if ( localStorage.getItem('bought') == 1 ) {
            // console.log('Klient dokonał już zakupu')
          } else {

            if ( localStorage.getItem('promo-showed') == 1 ) {
              // console.log('Baner został już wyświetlony')
            } else {
              $('#promo').modal('show');
              localStorage.setItem('promo-showed', 1);
            }
          }
        }
      });
    }
  });

  $('.pricing-row a').click(function(){
    localStorage.setItem('bought', 1);
  });
});
