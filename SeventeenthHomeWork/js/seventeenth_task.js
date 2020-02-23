$(document).ready(function() {
  $('.main_btna').on('click',function () {
      startAnimation()
  });

   $('.main_btn').on('click',function () {
      startAnimation()
  });

   $("a[href$='#sheldure']").on('click',function () {
        startAnimation();
   });

  $('.close').on('click',function () {
      $('.overlay').hide('slow');
      $('.modal').animate({height: 'hide'}, 500);
  });

    function startAnimation()
  {
      $('.overlay').show('slow');
      $('.modal').animate({height: 'show'}, 1000);
  }

});