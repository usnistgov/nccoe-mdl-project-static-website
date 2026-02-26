var siteName = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.siteName) 
               || "Nist | NccoE"; //fallback project name

$('a.external').leaveNotice({ siteName: siteName });

(function ($) {
  $(document).ready(function () {
    // Define your list of excluded domains 
    var EXCLUDED_DOMAINS = [
      'nist.gov',
      'nccoe.nist.gov',
      'csrc.nist.gov',
      'www.nist.gov',
      'www.nccoe.nist.gov'
    ];

    // function to identify NIST domain links
    var re_nist = {
      test: function (url) {
        try {
          var host = new URL(url, window.location.href).hostname.toLowerCase();
          for (var i = 0; i < EXCLUDED_DOMAINS.length; i++) {
            var d = EXCLUDED_DOMAINS[i].toLowerCase();
            if (host === d || host.endsWith('.' + d)) return true; // exact or subdomain
          }
          return false;
        } catch (e) {
          return false;
        }
      }
    };

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
      siteName: siteName
    });
  });
})(jQuery);