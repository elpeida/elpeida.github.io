
function InitLevel3() {


	level = 3;
	userArray = [];
	CoreArray = [];

	$(".LevelNumber").html(3);
	$("#ElegxosDiv").show();

	$("#ElegxosDiv").prev().hide();



	$("#Level2_Synnefo").hide();
	$("#Level3_Synnefo").show();
	

	StyleInitalizationL3();

	InitBrushes();


	ClearPattern();

	InitCentiped();

}


function StyleInitalizationL3() {
	$("#SynnefoImg").hide();

	$("#KampiaDiv_Level3").show();
	$(".SynnefoImg_3").show();
	
	$("#KampiaDiv").css('margin-top', "1%");
}


function DrawPattern_L3() {

	$('.centipedCircle').css('fill', initColor);
	$(".patternCircle").each(function (i, ch) {
		if (!$(ch).hasClass('notUsedPattern')) {
			$(ch).css('fill', whiteColorRGB);

		}

	});

	var patternSizeArray = [2, 3, 4];
	var patternSize = patternSizeArray[Math.floor(Math.random() * patternSizeArray.length)];
	var colors = [orangeColor, greenColor, pinkColor, purpleColor];


	//Δημιουργία τυχαίου pattern
	for (var i = 0; i < patternSize; i++) {
		var randomColor = colors[Math.floor(Math.random() * colors.length)];
		CoreArray[i] = randomColor;
	}


	//Γέμισμα πρώτων κυκλων σαρανταποδαρούσας
	for (var i = 0; i < CentipedeLength; i++) {

		var colorIndex = (i) % patternSize;
		userArray[i] = CoreArray[colorIndex];

		$("#c1_" + i).css('fill', CoreArray[colorIndex]);
		$("#c1_" + i).addClass('notallowed');
		if (i >= 10) {
			$("#n1_" + i + "_0").addClass('notallowed');
			$("#n1" + i + "_1").addClass('notallowed');
		}
		else
			$("#n1_" + i).addClass('notallowed');
	}
}



function CheckPattern_L3() {

	var patternSize = ComputePatternSize();
	hasErrors = false;

	for (var i = 0; i < CentipedeLength; i++) {

		var colorIndex = i % patternSize;
		var color = CoreArray2[colorIndex];

		if (userArray[i] != color)
			hasErrors = true;

		if (color == "")
			color = initColor;

		$("#c2_" + i).css('fill', color);

	}


	if (hasErrors) {
		ShowModal('WinLoseModal', 'lost');
		$.stopSound();
		$.playSound('./Sounds/fail.wav');
	}
	else {
		ShowModal('WinLoseModal', 'win');
		$.stopSound();
		$.playSound('./Sounds/win.wav');
	}

}

//function InitLevel3() {
	
//	level = 3;
//	userArray = [];
//	CoreArray = [];

//	$(".LevelNumber").html(3);
//	$("#ElegxosDiv").show();

//	$("#ElegxosDiv").prev().hide();



//	$("#Level2_Synnefo").hide();
//	$("#Level4_Synnefo").hide();
//	$("#Level3_Synnefo").show();

//	RemoveStyleInitalizationL4();

//	InitBrushes();
	

//	ClearPattern();
	
//	InitCentiped();

//}





//function DrawPattern_L3() {

//	$('.centipedCircle').css('fill', initColor);

//	var yesNoAr = ['yes', 'no'];
//	var usedPatternColors = []
//	var CentipedArray = [];


//	for (var i = 0; i < 24; i++) {
//		CentipedArray[i] = '';
//		usedPatternColors[i] = 0;
//	}

//	var patternSize = ComputePatternSize();
	
//	if (patternSize) {
//		var colors = [orangeColor, greenColor, pinkColor, purpleColor];

//		for (var i = 0; i < patternSize; i++) {
//			var randomColor = colors[Math.floor(Math.random() * colors.length)];

//			CoreArray[i] = randomColor;
//		}

//		var totalPatterns = 0;
//		if (patternSize != 0)
//			totalPatterns = CentipedeLength / patternSize;

//		var yesNoAr = ['yes', 'no'];

//		for (var i = 0; i < totalPatterns; i++) {
//			for (j = 0; j < patternSize; j++) {

//				var yesNo = yesNoAr[Math.floor(Math.random() * yesNoAr.length)];

//				if (yesNo == 'yes') {
//					CentipedArray[i * patternSize + j] = CoreArray[j];
//					userArray[i * patternSize + j] = CoreArray[j];
//					usedPatternColors[j] = 1;
//				}
//				else {
//					CentipedArray[i * patternSize + j] = initColor;

//				}
//			}
//		}

//		//Αν κάποιο χρώμα δεν έχει χρησιμοποιηθεί το βάζω στην αρχή
//		for (i = 0; i < patternSize; i++) {
//			if (usedPatternColors[i] == 0) {
//				//console.log("notused = " + i);
//				CentipedArray[i] = CoreArray[i];
//				userArray[i] = CoreArray[i];
//			}

//		}

//		//Γέμισμα σαρανταποδαρούσας
//		$(".centipedCircle").removeClass('notallowed');
//		$(".centipedNumber").removeClass('notallowed');
//		for (var i = 0; i < CentipedeLength ; i++) {

//			if (CentipedArray[i] != initColor) {
//				$("#c1_" + i).css('fill', CentipedArray[i]);
//				$("#c1_" + i).addClass('notallowed');
//				if (i >= 10) {
//					$("#n1_" + i + "_0").addClass('notallowed');
//					$("#n1" + i + "_1").addClass('notallowed');
//				}
//				else
//					$("#n1_" + i).addClass('notallowed');
//			}



//		}

//	}
//}



//function CheckPattern_L3() {

//	var patternSize = ComputePatternSize();
	
//	hasErrors = false;
//	for (var i = 0; i < CentipedeLength; i++) {
//		var color = i % patternSize;

		

//		if (userArray[i] != CoreArray[color]) {
//			hasErrors = true;
//		}
//	}
	
//	if (hasErrors) {
//		ShowModal('HelpModal', 'ModalMessage_Error');
//		$.stopSound();
//		$.playSound('./Sounds/fail.wav');
//	}
//	else {
//		ShowModal('WinLoseModal', 'win');
//		$.stopSound();
//		$.playSound('./Sounds/win.wav');
//	}

//}

//function ClearPattern_3() {

//	brushColor = "";

//	RemoveBrushClasses();

//	InitPattern();

	

//	$('#Centiped_1').find('.centipedCircle').each(function (i, ch) {
//		if (!$(ch).hasClass('notallowed')) {
//			$(ch).css('fill', initColor);
//			var data_num = $(ch).attr('data-num');
//			console.log(data_num);
//			userArray[data_num] = "";
//		}
//	});

	

//}