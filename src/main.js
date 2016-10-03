$(document).ready(() => {
  $('time a').text(function() {
    return moment(
      $(this).parent('time').data('date')
    ).fromNow();
  });

});