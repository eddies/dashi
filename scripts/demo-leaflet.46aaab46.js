"use strict";function drawMarkerSelect(a){var b=crossfilter(a),c=b.dimension(function(a){return a.geo}),d=c.group().reduceCount(),e=function(a){L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(a)};leafletMarker.tiles(e).dimension(c).group(d).center([42.69,25.42]).zoom(7).renderPopup(!1).filterByArea(!0),$("#demo1-map").height(400).width($(leafletMarker.root()[0]).parent().width());var f=b.dimension(function(a){return a.type}),g=f.group().reduceCount();leafletPie.dimension(f).group(g).width(200).height(200).renderLabel(!0).renderTitle(!0).ordering(function(a){return-a.value}),dc.renderAll("demo-leaflet")}var leafletMarker=dc.leafletMarkerChart("#demo1-map","demo-leaflet"),leafletPie=dc.pieChart("#demo1-pie","demo-leaflet");L.Icon.Default.imagePath="./images/leaflet",d3.tsv("data/demo-leaflet.tsv",function(a){drawMarkerSelect(a)});