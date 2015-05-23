'use strict';

/* jshint globalstrict: true */
/* global dc,d3,crossfilter */

var numberFormat = d3.format('.2f');
var usChart = dc.geoChoroplethChart('#us-chart', 'demo-vc');
var industryChart = dc.bubbleChart('#industry-chart', 'demo-vc');
var roundChart = dc.bubbleChart('#round-chart', 'demo-vc');
d3.csv('data/demo-vc.csv', function (csv) {
  var data = crossfilter(csv);
  var states = data.dimension(function (d) {
    return d.State;
  });
  var stateRaisedSum = states.group().reduceSum(function (d) {
    return d.Raised;
  });
  var industries = data.dimension(function (d) {
    return d['Industry Group'];
  });
  var statsByIndustries = industries.group().reduce(
    function (p, v) {
      p.amountRaised += +v.Raised;
      p.deals += +v.Deals;
      return p;
    },
    function (p, v) {
      p.amountRaised -= +v.Raised;
      if (p.amountRaised < 0.001) { p.amountRaised = 0; } // do some clean up
      p.deals -= +v.Deals;
      return p;
    },
    function () {
      return {amountRaised: 0, deals: 0};
    }
  );
  var rounds = data.dimension(function (d) {
    return d.RoundClassDescr;
  });
  var statsByRounds = rounds.group().reduce(
    function (p, v) {
      p.amountRaised += +v.Raised;
      p.deals += +v.Deals;
      return p;
    },
    function (p, v) {
      p.amountRaised -= +v.Raised;
      if (p.amountRaised < 0.001) { p.amountRaised = 0; } // do some clean up
      p.deals -= +v.Deals;
      return p;
    },
    function () {
      return {amountRaised: 0, deals: 0};
    }
  );
  
  d3.json('data/demo-us-states.json', function (statesJson) {
    usChart.width(990)
           .height(500)
           .dimension(states)
           .group(stateRaisedSum)
           .colors(d3.scale.quantize().range(['#E2F2FF', '#C4E4FF', '#9ED2FF', '#81C5FF', '#6BBAFF', '#51AEFF', '#36A2FF', '#1E96FF', '#0089FF', '#0061B5']))
           .colorDomain([0, 200])
           .colorCalculator(function (d) { return d ? usChart.colors()(d) : '#ccc'; })
           .overlayGeoJson(statesJson.features, 'state', function (d) {
             return d.properties.name;
           })
           .title(function (d) {
             return 'State: ' + d.key + '\nTotal Amount Raised: ' + numberFormat(d.value ? d.value : 0) + 'M';
           });
    industryChart.width(990)
                 .height(200)
                 .margins({top: 10, right: 50, bottom: 30, left: 60})
                 .dimension(industries)
                 .group(statsByIndustries)
                 .colors(d3.scale.category10())
                 .keyAccessor(function (p) {
                   return p.value.amountRaised;
                 })
                 .valueAccessor(function (p) {
                   return p.value.deals;
                 })
                 .radiusValueAccessor(function (p) {
                   return p.value.amountRaised;
                 })
                 .x(d3.scale.linear().domain([0, 5000]))
                 .r(d3.scale.linear().domain([0, 4000]))
                 .minRadiusWithLabel(15)
                 .elasticY(true)
                 .yAxisPadding(100)
                 .elasticX(true)
                 .xAxisPadding(200)
                 .maxBubbleRelativeSize(0.07)
                 .renderHorizontalGridLines(true)
                 .renderVerticalGridLines(true)
                 .renderLabel(true)
                 .renderTitle(true)
                 .title(function (p) {
                   return p.key +
                     '\n' +
                     'Amount Raised: ' + numberFormat(p.value.amountRaised) + 'M\n' +
                     'Number of Deals: ' + numberFormat(p.value.deals);
                 });
    industryChart.yAxis().tickFormat(function (s) {
      return s + ' deals';
    });
    industryChart.xAxis().tickFormat(function (s) {
      return s + 'M';
    });
    roundChart.width(990)
              .height(200)
              .margins({top: 10, right: 50, bottom: 30, left: 60})
              .dimension(rounds)
              .group(statsByRounds)
              .colors(d3.scale.category10())
              .keyAccessor(function (p) {
                  return p.value.amountRaised;
              })
              .valueAccessor(function (p) {
                  return p.value.deals;
              })
              .radiusValueAccessor(function (p) {
                  return p.value.amountRaised;
              })
              .x(d3.scale.linear().domain([0, 5000]))
              .r(d3.scale.linear().domain([0, 9000]))
              .minRadiusWithLabel(15)
              .elasticY(true)
              .yAxisPadding(150)
              .elasticX(true)
              .xAxisPadding(300)
              .maxBubbleRelativeSize(0.07)
              .renderHorizontalGridLines(true)
              .renderVerticalGridLines(true)
              .renderLabel(true)
              .renderTitle(true)
              .title(function (p) {
                return p.key +
                  '\n' +
                  'Amount Raised: ' + numberFormat(p.value.amountRaised) + 'M\n' +
                  'Number of Deals: ' + numberFormat(p.value.deals);
              });
    roundChart.yAxis().tickFormat(function (s) {
      return s + ' deals';
    });
    roundChart.xAxis().tickFormat(function (s) {
      return s + 'M';
    });
    dc.renderAll('demo-vc');
  });
});