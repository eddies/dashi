'use strict';

/* global dc, d3 */

/*jshint unused:false*/
/*jshint browser: true */




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
