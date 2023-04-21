function InitButtons() {

	$("#ClearButton").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/click.mp3');
		if (level == 4)
			ClearPattern_4();
		else
			ClearPattern();
	});

	$("#CheckPattern").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (level == 1)
			CheckPattern_L1();

		if (level == 2)
			CheckPattern_L2();

		if (level == 3)
			CheckPattern_L3();

		if (level == 4)
			CheckPattern_L4();
	});

	$("#DrawPattern").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		var hasError = false;
		if (level == 1 ) {
			$(".patternCircle").each(function (i, ch) {

				if ($(ch).css('fill') == whiteColorRGB) {

					hasError = true;
				}
			});
		}
		//if (hasError) {
		//	ShowModal('HelpModal','ModalMessage_FillPatternCircles');
		//	return;
		//}
		if (level == 1)
			DrawPattern_L1();

		if (level == 2)
			DrawPattern_L2();

		if (level == 3)
			DrawPattern_L3();

		if (level == 4)
			DrawPattern_L4();
	});
	
	$("#NextLevel").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/Level.mp3');

		level++;

		if (level > 4)
			level = 4;

		switch (level) {
			case 2:
				InitLevel2();
				break;
			case 3:
				InitLevel3();
				break;
			default:
				InitLevel4();
		}

	});

	$("#PrevLevel").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/Level.mp3');

		level--;

		if (level < 1)
			level = 1;

		switch (level) {
			case 1:
				InitLevel1();
				break;
			case 2:
				InitLevel2();
				break;
			default:
				InitLevel3();
		}

	});

	$("#increasePatternButton").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if ($("#patternCircle_1").hasClass('notUsedPattern')) {
			$("#patternCircle_1").removeClass('notUsedPattern');
			$("#patternCircle_1").css('fill', 'white');
			
		}
		else if ($("#patternCircle_2").hasClass('notUsedPattern')) {
			$("#patternCircle_2").removeClass('notUsedPattern');
			$("#patternCircle_2").css('fill', 'white');
			
		}
		else if ($("#patternCircle_3").hasClass('notUsedPattern')) {
			$("#patternCircle_3").removeClass('notUsedPattern');
			$("#patternCircle_3").css('fill', 'white');
			
		}

	});

	$("#decreasePatternButton").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (!$("#patternCircle_3").hasClass('notUsedPattern')) {
			$("#patternCircle_3").addClass('notUsedPattern');
			$("#patternCircle_3").css('fill', '');
			CoreArray[3] = "";
		}
		else if (!$("#patternCircle_2").hasClass('notUsedPattern')) {
			$("#patternCircle_2").addClass('notUsedPattern');
			$("#patternCircle_2").css('fill', '');
			CoreArray[2] = "";
		}
		else if (!$("#patternCircle_1").hasClass('notUsedPattern')) {
			$("#patternCircle_1").addClass('notUsedPattern');
			$("#patternCircle_1").css('fill', '');
			CoreArray[1] = "";
		}

	});
	
	$("#Instructions").bind('click', function () {
		console.log("SS");
		if (level == 1) {
			
			$.stopSound();
			$.playSound('./Sounds/soundLevel1.mp3');
		}
		else if (level == 2) {
			$.stopSound();
			$.playSound('./Sounds/soundLevel2.mp3');
		}
		else if (level == 3) {
			$.stopSound();
			$.playSound('./Sounds/soundLevel3.mp3');
		}
		else if (level == 4) {
			$.stopSound();
			$.playSound('./Sounds/soundLevel4.mp3');
		}
	});
	
}
function ClearPattern() {

	brushColor = "";

	RemoveBrushClasses();

	InitPattern();

	$('.centipedCircle').css('fill', initColor);

	$('body').find('.centipedCircle').each(function (i, ch) {
		$(ch).removeClass('notallowed');
	});
		
	$('.centipedNumber').removeClass('notallowed');

	for (var i = 0; i < 4; i++) {
		CoreArray[i] = "";
		CoreArray2[i] = "";
	}

	for (var i = 0; i < CentipedeLength; i++)
		userArray[i] = "";

}

function RemoveBrushClasses() {

	$(".Brush").each(function (i, ch) {

		$(ch).removeClass('ScaleBrushOrange');
		$(ch).removeClass('ScaleBrushGreen');
		$(ch).removeClass('ScaleBrushPink');
		$(ch).removeClass('ScaleBrushPurple');

	});

}

function InitPattern() {
	//$('.patternCircle').css('fill', '#fff');
	$('.patternCircle').each(function (i, ch) {
		if (!$(ch).hasClass('notUsedPattern')) {
			$(ch).css('fill', '#fff');
		}
	});
		

	$('.patternCircle').unbind('click');

	$('.patternCircle').bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (!$(this).hasClass('notUsedPattern')) {
			
			if (level == 1) {
				if (brushColor != "") {
					$(this).css('fill', brushColor);
					var brushNumber = $(this).attr('data-num');
					CoreArray[brushNumber] = brushColor;
				}
			}
			if (level == 3) {
				if (brushColor != "") {
					$(this).css('fill', brushColor);
					var brushNumber = $(this).attr('data-num');
					CoreArray2[brushNumber] = brushColor;
				}
			}
			//else if (level == 3 || level == 2) {
			//	$(this).css('fill', greyColor);
			//}
		}
	});
}

function InitBrushes() {

	$(".Brush").unbind('click');

	$(".Brush").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		var id = $(this).attr('id');
		RemoveBrushClasses();
		switch (id) {
			case 'orangeBrush':

				if (brushColor == orangeColor) {
					brushColor = "";
				}
				else {
					brushColor = orangeColor;
					$(this).addClass('ScaleBrushOrange');
				}
				break;
			case 'greenBrush':
				if (brushColor == greenColor) {
					brushColor = "";
				}
				else {
					brushColor = greenColor;
					$(this).addClass('ScaleBrushGreen');
				}
				break;
			case 'pinkBrush':
				if (brushColor == pinkColor) {
					brushColor = "";
				}
				else {
					brushColor = pinkColor;
					$(this).addClass('ScaleBrushPink');
				}
				break;
			default:
				if (brushColor == purpleColor) {
					brushColor = "";
				}
				else {
					brushColor = purpleColor;
					$(this).addClass('ScaleBrushPurple');
				}
		}



	});
}

function InitCentiped() {

	

	$(".centipedCircle").unbind('click');
	$(".centipedNumber").unbind('click');

	$(".centipedCircle").css('fill', initColor);

	$(".centipedCircle").bind('click', function () {
		
		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (!$(this).hasClass('notallowed')) {
			var num = $(this).attr('data-num');
			if (brushColor != "") {
				userArray[num] = brushColor;
				$(this).css('fill', brushColor);
			}
		}
		

	});

	$(".centipedNumber").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (!$(this).hasClass('notallowed')) {
			if (brushColor != "") {
				var num = $(this).attr('data-num');
				$("#c1_" + num).css('fill', brushColor);
				userArray[num] = brushColor;
			}
		}


	});
}

function ComputePatternSize() {

	if (level == 1 ) {
		var patternSize = 3;
		while (CoreArray[patternSize] == "") {
			patternSize--;
		}

		patternSize = patternSize + 1;
		return patternSize;
	}
	//else if (level == 4) {
	//	var patternSize = 3;
	//	while (CoreArray2[patternSize] == "") {
	//		patternSize--;
	//	}

	//	patternSize = patternSize + 1;
	//	return patternSize;
	//}


	else if (level == 4 || level == 2) {
		var patternSize = 0;
		$('body').find('.patternCircle').each(function (i, ch) {

			if ( $(ch).css('fill') == whiteColorRGB)
				patternSize++;

		});
		return patternSize;
	}
	else if (level == 3) {
		var patternSize = 4;
		$('body').find('.patternCircle').each(function (i, ch) {

			if ($(ch).css('fill').indexOf('url')>-1)
				patternSize--;

		});
		return patternSize;
	}
}

function ShowModal(id, el) {
	$(".ModalMessages").hide();
	$('.WinLoose').hide();
	$("#" + el).show();

	$("#" + id).modal('show');


	setTimeout(function () { $("#" + id).modal('hide'); }, 2500);
}

function RemoveStyleInitalizationL3() {


	$("#KampiaDiv_Level3").hide();
	$(".SynnefoImg_3").hide();
	$("#KampiaDiv").css('margin-top', "5%");

	$("#SynnefoImg").show();
}