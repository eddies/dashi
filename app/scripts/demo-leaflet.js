'use strict';

/* global dc, d3, crossfilter */

var leafletMarker = dc.leafletMarkerChart('#demo1-map');
var leafletPie = dc.pieChart('#demo1-pie');

function drawMarkerSelect(data) {
  var xf = crossfilter(data);
  
	var facilities = xf.dimension(function(d) { return d.geo; });
	var facilitiesGroup = facilities.group().reduceCount();

  leafletMarker
    .dimension(facilities)
    .group(facilitiesGroup)
    //.width(600)
    //.height(400)
    .center([42.69,25.42])
    .zoom(7)
    .renderPopup(false)
    .filterByArea(true);
      
  $('#demo1-map').height(400).width($(leafletMarker.root()[0]).parent().width());
  
	var types = xf.dimension(function(d) { return d.type; });
	var typesGroup = types.group().reduceCount();

  leafletPie
    .dimension(types)
    .group(typesGroup)
    .width(200)
    .height(200)
    .renderLabel(true)
    .renderTitle(true)
    .ordering(function (p) {
      return -p.value;
    });

	dc.renderAll();
}

d3.tsv('data/demo-leaflet.tsv', function(data) {
  drawMarkerSelect(data);
});
