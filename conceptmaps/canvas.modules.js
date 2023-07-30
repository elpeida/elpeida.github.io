var selectedDraggableItem;
let selectedButton = null;

$(function(){
	
	// InitDragableItems();
	InitUserImage();

	$(window).on('resize', function(){
		ResizeCanvas();
	});
    
});

function ResizeCanvas(){
	var c = $("#canvas");
	var position = c.offset();

	canvasX =  position.left;
	canvasY =  position.top;
}

function InitDragableItems(){
	$('.items').find('img').each(function(i,ch){

		$(ch).bind('click',function(){

			var imgWidth = $("#canvas").width()/10;
			var d = $('<div> <img src="' + $(ch).attr('src')+ '" "></div>');

			$(".canvas-container").prepend(d);

			InitDragableItem();

			canvasmode = "";
			clearSelectedButton();
		});

	});
}

function InitDragableItem(){
	$('.canvas-container').find('div').each(function(i,ch){
	
		$(ch).addClass('draggableItem');
		
	});
	
	$('.draggableItem').each(function(i,ch){
	
		// $(ch).draggable({ containment: ".canvas-container", scroll: false, stack: "div"} );
		$(ch).draggable({ containment: ".canvas-container"} );
		
		$(ch).unbind('click');

		$(ch).bind('click', function(){

			if(canvasmode=="eraseItem") {
				$(ch).remove();
			}	

			if(canvasmode=="resizeBigger") {
			

				if($(ch).find('img').length>0){
					var scale = $(ch).find('img').first().css('scale');
				
					if(scale == "none"){
						scale = 1.1;
					}
					else{
						scale = parseFloat(scale) + 0.1;
					}
						
					$(ch).find('img').first().css('scale',scale);
				}
				else{
					
					var sizeInPixels = $(ch).css('font-size');
					
					var windowHeight = window.innerHeight;

					sizeInPixels = parseFloat(sizeInPixels) + 5;

					var vh =  (sizeInPixels* 100 / windowHeight).toFixed(2);

					$(ch).css('font-size', vh+'vh');
				}
				
			}	

			if(canvasmode=="resizeSmaller"){
			

				if($(ch).find('img').length>0){
					var scale = $(ch).find('img').first().css('scale');
				
					if(scale == "none"){
						scale = 0.9;
					}
					else if(scale == 0.2)
					{
						;
					}
					else{
						scale = parseFloat(scale) - 0.1;
					}
						
					$(ch).find('img').first().css('scale',scale);
				}
				else{
					var sizeInPixels = $(ch).css('font-size');
					
					var windowHeight = window.innerHeight;

					sizeInPixels = parseFloat(sizeInPixels) - 5;

					if(sizeInPixels>6){

						var vh =  (sizeInPixels* 100 / windowHeight).toFixed(2);

						$(ch).css('font-size', vh+'vh');
					}
				}
				
			}	

		})
	});
}


function deleteAllItemsCanvas(){
	
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

	$('.draggableItem').each(function(i,ch){

		$(ch).remove();
	});
}


function PrintCanvas() {
	var bg = $("#printBgCavasHelper").val();

	var printStr = '<img id="printBgImage" src="'+bg+'" style="width:100%;margin:auto">' +
					'<img id="canvasImg" src="#" style="width:100%;position: absolute;top:0px;left:0px">';

	$("#PrintArea").html(printStr);
	const canvasContainer = document.getElementsByClassName('canvas-container');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

	var ratio=canvasContainer[0].clientHeight/canvasContainer[0].clientWidth;
	var divW = 18;
	var divh = (20*ratio);

		
	var dataURL = canvas.toDataURL('image/png');
	var img = new Image();
	img.src = canvas.toDataURL();
	
	img.onload = function () {
		var height = this.height;
		var initHeight = this.height;

		var initWidth = this.width;
		var width = this.width;
				var ratio = height /initWidth;
				if (initWidth > 700) {
					width = 700;
					height = Math.floor(width * ratio);
					ratio = height / width;

										
				}

				$(".draggableItem").each(function (i, ch) {
					var pos = $(ch).position();

					var posleft = pos.left;
					var postop = pos.top;

					

					if ($(ch).find('img').length > 0) {
						var w = $(ch).find('img').first().width();
						var h = $(ch).find('img').first().height();
						
						if (initWidth > 700) {
							w = w * ratio;
							h = h * ratio

							var widthRatio = width / initWidth;
							var heigthRatio = height / initHeight;
							posleft = posleft * widthRatio;
							postop = postop * heigthRatio;
						}

						var scale = $(ch).find('img').first().css('scale');
						var d = $('<div style="position:absolute;left:' + posleft + 'px; top:' +postop + 'px"> <img src="' + $(ch).find('img').first().attr('src') + '" width="' + w + 'px height="' + h + 'px" style="scale:' + scale + '"></div>');
					}
					else {

						var fontSize = parseFloat($(ch).css('font-size'));

						if (initWidth > 700) {
							w = w * ratio;
							h = h * ratio

							var widthRatio = width / initWidth;
							var heigthRatio = height / initHeight;
							posleft = posleft * widthRatio;
							postop = postop * heigthRatio;

							
							fontSize = fontSize * ratio;

						}


						var d = $('<div style="position:absolute;white-space: nowrap; font-size:' + Math.floor(fontSize) + 'px;left:' + posleft + 'px; top:' + postop + 'px"> ' + $(ch).text() + '</div>');
					}

					$("#PrintArea").prepend(d);


				});

				$("#canvasImg").attr('src',dataURL);

				$("#PrintArea").css({
					 'width':width + 'px',
					 'height':height + 'px',
					'border':'1px solid black',
					'position': 'relative',
					'display':'inline'
				});

				$("#PrintArea").printThis({debug: false});
			};
	
	
	
	

}


function clearSelectedButton() {
    if (selectedButton != null) {
        let selectedButtonElement = document.getElementById(selectedButton + "-btn");
        selectedButtonElement.classList.remove('selectedBtn');
        
		if (selectedButton == "draw") {
			colorsContainer.classList.add("removed");
    
			for (let i=0; i<canvasButtons.length; i++) {
				canvasButtons[i].style.width = "10%";
			}

			for (let i=0; i<colorElements.length; i++){
				colorElements[i].style.transform = "scale(1)";
				colorElements[i].style.border = "1px solid #000000";
			}

			selectedColor = null;
			selectedHexColor = "#000000";
		}

		selectedButton = null;
        canvasmode = "";
    }
    return;
}