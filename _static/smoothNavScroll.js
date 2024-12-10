(function ($) {
  $(document).ready(function () {
    $(".topbar").addClass("topbar-transparent");
  });

  $(window).scroll(function () {
    if (!$("#nistheadergoeshere").visible(true)) {
      $(".topbar").removeClass("topbar-transparent");
    } else {
      $(".topbar").addClass("topbar-transparent");
    }
  });
})(jQuery);
