
  //toggle plus button
  $(".fa-minus-circle").click(function() {
    $("input.taskAdd[type='text']").fadeToggle();
    $(this).fadeOut(150, function() {
      $(".fa-plus-circle").fadeIn(150);
    });
  });
  $(".fa-plus-circle").click(function() {
    $("input.taskAdd[type='text']").fadeToggle();
    $(this).fadeOut(150, function() {
      $(".fa-minus-circle").fadeIn(150);
    });
  });