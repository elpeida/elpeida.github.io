var canvasX = 0;
var canvasY = 0;

var canvasmode ="";
let selectedHexColor = "#000000";
let selectedColor = null;

$(function(){

	// IintUserImage();
	InitCanvas();

    
});


function InitCanvas(){

    var c = $("#canvas");
    var position = c.offset();

	canvasX =  position.left;
    canvasY =  position.top;

canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0,
    lineThickness = 2;
	
    var w = $(".canvas-container").width();
    var h = $(".canvas-container").height();


    canvas.width = w;
    canvas.height = h;
	// canvas.width = $("#canvas").width();
    // canvas.height = $("#canvas").height();

    


canvas.onmousedown = function(e) {
    painting = true;
    

    ctx.fillStyle = "black";
	lastX = e.pageX - canvasX;
    lastY = e.pageY - canvasY;
	
    
  
};

canvas.onmouseup = function(e){
    painting = false;
}

canvas.onmousemove = function(e) {
    
    if (painting && (canvasmode=="draw" || canvasmode=="erase")) {
		
        

        mouseX = e.pageX - canvasX;
        mouseY = e.pageY - canvasY;

        // find all points between        
         var x1 = mouseX,
        x2 = lastX,
        y1 = mouseY,
        y2 = lastY;

        var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
        if (steep){
            var x = x1;
            x1 = y1;
            y1 = x;

            var y = y2;
            y2 = x2;
            x2 = y;
        }
        if (x1 > x2) {
            var x = x1;
            x1 = x2;
            x2 = x;

            var y = y1;
            y1 = y2;
            y2 = y;
        }

        var dx = x2 - x1,
            dy = Math.abs(y2 - y1),
            error = 0,
            de = dy / dx,
            yStep = -1,
            y = y1;
        
        if (y1 < y2) {
            yStep = 1;
        }
       
        // lineThickness = 5 - Math.sqrt((x2 - x1) *(x2-x1) + (y2 - y1) * (y2-y1))/10;
        if(lineThickness < 1){
            lineThickness = 1;   
        }

        for (var x = x1; x < x2; x++) {

           
         
            if(canvasmode == "draw"){
                ctx.fillStyle = selectedHexColor;
				if (steep) {
					ctx.fillRect(y, x, lineThickness , lineThickness );
				} else {
					ctx.fillRect(x, y, lineThickness , lineThickness );
				}
			}
			else if(canvasmode == "erase"){
			
				if (steep) {
					ctx.clearRect(y, x, lineThickness , lineThickness );
				} else {
					ctx.clearRect(x, y, lineThickness , lineThickness );
				}
			
			}
			
			

            
            error += de;
            if (error >= 0.5) {
                y += yStep;
                error -= 1.0;
            }
        }



        lastX = mouseX;
        lastY = mouseY;

    }
	}
}