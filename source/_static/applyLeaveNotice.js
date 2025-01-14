(function ($) {
  $(document).ready(function () {
    // Regex to identify NIST domain links
    var re_nist = new RegExp('^https?:\\/\\/((csrc|nccoe|www|www\\.nccoe|)*\\.)*nist\\.gov(\\/|$)');
    // Regex to identify absolute URLs
    var re_absolute_address = new RegExp('^((https?:)?\\/\\/)');
    // Regex to identify mailto links
    var re_mailto = new RegExp('^mailto:');

    $("a").each(function () {
      var url = $(this).attr('href');

      // Remove any existing classes to prevent overlap
      $(this).removeClass('local external');

      if (re_mailto.test(url)) {
        // Mark mailto links as local
        $(this).addClass('local');
      } else if (re_nist.test(url) || !re_absolute_address.test(url)) {
        // Mark NIST links or relative links as local
        $(this).addClass('local');
      } else {
        // This a href appears to be external, so tag it
        $(this).addClass('external');
      }
    });

    // Add leaveNotice to external A elements
    $('a.external').leaveNotice({
      siteName: "NCCoE MDL Project"
    });
  });
})(jQuery);
