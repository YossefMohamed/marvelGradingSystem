/*
------------------------------------------------------------------------------------------------------
                                        Start Global Pages Script!
------------------------------------------------------------------------------------------------------
*/
// Use this script to show dataTables buttons on the page

$(document).ready(function() {
  $("#example").DataTable({
    dom: "Bfrtip",
    buttons: ["copy", "excel", "pdf", "print"]
  });
});

// Use this script to show (* TWO *) dataTables plugins on the same page

$(document).ready(function() {
  $("table.display").DataTable();
});

// Use this script to show Bootstarp tooltip on the page

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

// Use this script to show Bootstarp tooltip with other clickable items on the page

$(function() {
  $('[data-tooltip="true"]').tooltip();
});

// End Global Pages Script!

/*
---------------------------------------------------------------------------------------------------------
                                        Start HR Dashboard Chart Script!
---------------------------------------------------------------------------------------------------------
*/

// Chart For Employees structure by gender

am4core.useTheme(am4themes_animated);
// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);
// Add data
chart.data = [
  {
    gender: "Female",
    litres: 501.9
  },
  {
    gender: "Male",
    litres: 301.9
  }
];
// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "gender";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
// End Chart For Employees structure by gender

// Start Chart For Employees structure by units
am4core.useTheme(am4themes_animated);
// Create chart instance
var chart = am4core.create("chartdiv2", am4charts.PieChart);
// Add data
chart.data = [
  {
    incomeType: "Other",
    litres: 501.9
  },
  {
    incomeType: "Administratives",
    litres: 301.9
  },
  {
    incomeType: "Teachers",
    litres: 800.9
  }
];
// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "units";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
// End Chart For Employees structure by units

// Start Chart For Employees Analysis
am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create("chartdiv5", am4charts.XYChart);
  chart.scrollbarX = new am4core.Scrollbar();

  // Add data
  chart.data = [
    {
      type: "Total Employees",
      total: 3025
    },
    {
      type: "New Employees",
      total: 2200
    },
    {
      type: "Arabic Teachers",
      total: 1882
    },
    {
      type: "English Teachers",
      total: 1809
    },
    {
      type: "Germany Teachers",
      total: 1322
    },
    {
      type: "French Teachers",
      total: 1122
    },
    {
      type: "Science Teachers",
      total: 1114
    },
    {
      type: "Math Teachers",
      total: 984
    },
    {
      type: "Quran Teachers",
      total: 711
    },
    {
      type: "P.E Teachers",
      total: 665
    },
    {
      type: "ART Teachers",
      total: 580
    },

    {
      type: "Retired",
      total: 441
    }
  ];

  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "type";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "total";
  series.dataFields.categoryX = "type";
  series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  series.columns.template.strokeWidth = 0;

  series.tooltip.pointerOrientation = "vertical";

  series.columns.template.column.cornerRadiusTopLeft = 10;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.fillOpacity = 0.8;

  // on hover, make corner radiuses bigger
  var hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;

  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });

  // Cursor
  chart.cursor = new am4charts.XYCursor();
}); // end am4core.ready()

// End HR Dashboard Chart Script!

/*
---------------------------------------------------------------------------------------------------------
                                        Start Attendance Page Script!
---------------------------------------------------------------------------------------------------------
*/

// Use this script to disable datatables ordering from selected table
$("#attend-table").dataTable({
  ordering: false
});

$("#addAttend-table").dataTable({
  ordering: false
});

$("#attendUser-table").dataTable({
  ordering: false
});

// End Attendance Page Script!


/*
---------------------------------------------------------------------------------------------------------
                                        Start Job Vacancies Page Script!
---------------------------------------------------------------------------------------------------------
*/







/*
--------------------------------------------------------------------------------------------------------
                          Loader Script
--------------------------------------------------------------------------------------------------------
*/

//

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}




