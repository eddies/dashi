'use strict';

/*jshint unused:false*/

/**
 * Dynamically load content into Bootstrap tabs
 */
$(function() {
  
  // see: https://stackoverflow.com/questions/28322636/synchronous-xmlhttprequest-warning-and-script
  $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
      options.async = true;
  });
  
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr('href'); // activated tab
    var url = $(e.target).attr('data-url');
    if ($(target).is(':empty')) {
      $(target).load(url);      
      // $.ajax({
      //   async: true,
      //   type: 'GET',
      //   url: url,
      //   success: function(data){
      //     $(target).html(data);
      //   }
      // });
    }
  });
});
