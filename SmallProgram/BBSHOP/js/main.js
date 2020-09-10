$(function(){
  var tmp = null,
    $title = $('.title'),
    $con = $('.title > ul');
  
  $title.click(function(){
    $(tmp).children('ul').slideUp().end().children('.arrow').removeClass('arrow-up');
    $(this).children('ul').slideToggle().end().children('.arrow').addClass('arrow-up');
    tmp = this;
  });
  $con.click(function(){
    return false;  
  });
});