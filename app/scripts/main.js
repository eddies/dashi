'use strict';

/* global dc, d3 */

/*jshint browser: true */

/**
 * Dynamically load content into Bootstrap tabs
 */
$(function() {

  // see: https://stackoverflow.com/questions/28322636/synchronous-xmlhttprequest-warning-and-script
  /*jshint unused:false*/
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

/**
 * Allow linking to Bootstrap tabs
 *
 * see: http://stackoverflow.com/a/26430204/3811916
 * see: https://github.com/twbs/bootstrap/issues/2415
 */
$(function() {
    // cache the id
    var navbox = $('.nav-pills');

    // activate tab on click
    // navbox.on('click', 'a', function (e) {
    //   var $this = $(this);
    //   // prevent the Default behavior
    //   e.preventDefault();
    //   // send the hash to the address bar
    //   window.location.hash = $this.attr('href');
    //   // activate the clicked tab
    //   $this.tab('show');
    // });

    // will show tab based on hash
    function refreshHash() {
      navbox.find('a[href="' + window.location.hash + '"]').tab('show');
    }

    // show tab if hash changes in address bar
    $(window).bind('hashchange', refreshHash);

    // read hash from address bar and show it
    if(window.location.hash) {
      // show tab on load
      refreshHash();
    }
});

// Monkey patch to override behavior of turn(On|Off)Controls,
// allowing reset link to be located in a sibling div of the chart
dc.baseMixin = (function(original) {
  return function (_chart) {
    var result = original.apply(this, arguments);
    
    _chart.turnOnControls = function () {
      var grandparent = _chart.root().node().parentNode.parentNode;
      var _filterPrinter = _chart.filterPrinter();
      d3.select(grandparent).selectAll('.reset').style('display', null);
      d3.select(grandparent).selectAll('.filter')
        .text(_filterPrinter(_chart.filters())).style('display', null);
      return _chart;
    };
    
    _chart.turnOffControls = function () {
      var grandparent = _chart.root().node().parentNode.parentNode;
      d3.select(grandparent).selectAll('.reset').style('display', 'none');
      d3.select(grandparent).selectAll('.filter')
        .style('display', 'none').text(_chart.filter());
      return _chart;
    };

    return result;
  };

})(dc.baseMixin);
