'use strict';

/* global dc, d3, crossfilter, L */

var leafletMarker = dc.leafletMarkerChart('#demo1-map', 'demo-leaflet');
var leafletPie = dc.pieChart('#demo1-pie', 'demo-leaflet');

// set imagePath manually to the location Grunt will 
L.Icon.Default.imagePath = './images/leaflet';

function drawMarkerSelect(data) {
  var xf = crossfilter(data);
  
	var facilities = xf.dimension(function(d) { return d.geo; });
	var facilitiesGroup = facilities.group().reduceCount();
  var tiles = function (map) {
    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  };
  
  leafletMarker
    .tiles(tiles)
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

	dc.renderAll('demo-leaflet');
}

d3.tsv('data/demo-leaflet.tsv', function(data) {
  drawMarkerSelect(data);
});
