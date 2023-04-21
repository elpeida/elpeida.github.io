window.onafterprint = function(){
    document.getElementById("toolbar").style.display = "block";
}



Chart.register(ChartDataLabels);
const ctxbar = document.getElementById('mybar');
const ctxpie = document.getElementById('mypie');
const ctxline = document.getElementById('myline');
const status = [1,1,1];//all graphs are on
const bar = 0;
const pie = 1;
const line = 2;
/*const xromatologio  = ["red","orange","yellow","blue","seagreen","maroon","olive","gainsboro",
"darkblue","mediumspringgreen","royalblue","aqua","deepskyblue","orchid","fuchsia","khaki",
"salmon","deeppink","dimgray","chartreuse",]*/
xromatologio = [
    '#e6194b', 
    '#3cb44b', 
    '#ffe119', 
    '#4363d8', 
    '#f58231', 
    '#911eb4', 
    '#46f0f0', 
    '#f032e6', 
    '#bcf60c', 
    '#fabebe', 
    '#008080', 
    '#e6beff', 
    '#9a6324', 
    '#fffac8', 
    '#800000', 
    '#aaffc3', 
    '#808000', 
    '#ffd8b1',
    '#000075',
    '#808080'];


//lighten color javascript function made by chatgpt
function lightenColor(colorCode, percentage) {
  // Remove the "#" character from the beginning of the color code
  colorCode = colorCode.substring(1);
  
  // Convert the hexadecimal color code to RGB values
  var r = parseInt(colorCode.substring(0, 2), 16);
  var g = parseInt(colorCode.substring(2, 4), 16);
  var b = parseInt(colorCode.substring(4, 6), 16);
  
  // Calculate the amount by which to lighten the color
  var amount = Math.round(2.55 * percentage);
  
  // Lighten the color by the specified amount
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  
  // Convert the RGB values back to a hexadecimal color code
  var hexCode = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  
  return hexCode;
}

function lightenxrom(pososto){
    for (i=0; i<xromatologio.length; i++){
        xromatologio[i] = lightenColor(xromatologio[i],pososto);
    }
}
lightenxrom(10);

var data = [
    ['', '0'],
    ['','0'],
];

 
var table = jspreadsheet(document.getElementById('spreadsheet'), {
    allowManualInsertRow: false,
    allowManualColumnInsert: false,
    data:data,
    columns: [
        {
            type: 'text',
            title:'Είδος',
            width:320
        },
        {
            type: 'number',
            mask: '0',
            title:'Ποσότητα',
            width:100
        },
     ],
    options: [{allowmanualinsertrows:false}],
    onchange: updateData,
});

paintrow(1);
paintrow(2);

var barchart = new Chart(ctxbar, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: xromatologio,
        borderWidth: 1
      }]
    },

    options: {
      plugins :{
              datalabels: {
                color: '#000000',
                font: {
                  weight: 'bold',
                  size: 16,
                }
            },
            legend: {
                display: false
                    }
                },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


var piechart = new Chart(ctxpie, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: xromatologio,
        borderWidth: 1
      }]
    },
    options: {
        plugins: {
            datalabels: {
                color: '#000000',
                font: {
                  weight: 'bold',
                  size: 16,
                }
            },
            legend: {
                display: false
                    }
                }
            }
  });

var linechart = new Chart(ctxline, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderWidth: 4,
        borderColor: 'Black',
      }]
    },
    options: {
        plugins: {
              datalabels: {
                color: '#dddddd',
                font: {
                  weight: 'bold',
                  size: 10,
                }
            },
            legend: {
                display: false
                    }
                }
            }
  });

function sanitizeData(data){
    labels = []
    counts = []
    colors = []
    for (var i=0; i<data.length; i++){
        //alert(data)
        
        if ((data[i][1] != 0)&&(data[i][0] != "")){//αν δεν υπάρχουν αντικείμενα 
                                                   //αν δεν υπάρχει περιγραφή  
                                                   //δεν υπάρχουν γραφικές παραστάσεις 
            labels.push(data[i][0]);
            counts.push(Number(data[i][1]));
            colors.push(xromatologio[i]);
        }
    }
    return([labels,counts,colors]);
}



function paintrow(i){
    table.setStyle("A"+i.toString(), 'background-color', xromatologio[i-1]);
    table.setStyle("B"+i.toString(), 'background-color', xromatologio[i-1]);
}

function restorecolors(){
    for (var i=0; i<table.getData().length+1; i++)
        paintrow(i+1);
}

/*
function paintspreadsheet(data){
    console.log("---------------------")
    for (var i=0; i<data.length; i++)
        {data[i][1] = Number(data[i][1])
        if ((data[i][1] != 0)&&(data[i][0] != "")){//αν δεν υπάρχουν αντικείμενα 
                                                   //αν δεν υπάρχει περιγραφή  
                                                   //δεν βάφεται
            console.log("paint:"+i)
            paintrow(i+1)
        }
    }
}
*/
function updatechart(chart,labels,counts,colors){
    chart.data.datasets[0].data = counts;
    chart.data.labels = labels;
    chart.data.datasets[0].backgroundColor = colors;
    console.log(chart);
    //chart.defaults.backgroundColor=colors;
    chart.update();
}


function updateData(){
    data = table.getData(false);
    [labels,counts,colors] = sanitizeData(data);

    updatechart(barchart,labels,counts,colors);
    updatechart(piechart,labels,counts,colors);
    updatechart(linechart,labels,counts,colors);
}

function insertRow(){
    if (table.getData().length<20){
        table.insertRow(1);
        paintrow(table.getData().length);
    }
}

function deleteRow(){
    table.deleteRow();//deletes last row
}

function sortAsc(){
    table.orderBy(1);
    restorecolors();
    updateData();
}

function sortDesc(){
    table.orderBy(1,1);
    restorecolors();
    updateData();
}

function winprint(){
    document.getElementById('toolbar').style.display= "none";
    window.print();
}


function redojexcel(){
    table.redo();
}
function undojexcel(){
    table.undo();
}

function togglebar(){
    if (status[bar]){
        document.getElementById("bardiv").style.display="none";
        document.getElementById("barbtnimg").src="./imgs/btnbar.svg";
    }
    else{
        document.getElementById("bardiv").style.display="block";
        document.getElementById("barbtnimg").src="./imgs/btnbaroff.svg";
    }
    status[bar] = 1-status[bar];
}

function togglepie(){
    if (status[pie]){
        document.getElementById("piediv").style.display="none";
        document.getElementById("piebtnimg").src="./imgs/btnpie.svg";
    }
    else{
        document.getElementById("piediv").style.display="block";
        document.getElementById("piebtnimg").src="./imgs/btnpieoff.svg";
    }
    status[pie] = 1-status[pie];
}

function toggleline(){
    if (status[line]){
        document.getElementById("linediv").style.display="none";
        document.getElementById("linebtnimg").src="./imgs/btnline.svg";
    }
    else{
        document.getElementById("linediv").style.display="block";
        document.getElementById("linebtnimg").src="./imgs/btnlineoff.svg";
}
    status[line] = 1-status[line];
}
