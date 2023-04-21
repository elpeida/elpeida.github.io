function InitLevel2() {
	
	level = 2;
	userArray = [];
	CoreArray = [];

	$(".LevelNumber").html(2);
	$("#ElegxosDiv").show();

	$("#ElegxosDiv").prev().hide();


	$("#Level1_Synnefo").hide();
	$("#Level3_Synnefo").hide
	$("#Level4_Synnefo").hide();
	$("#Level2_Synnefo").show();

	RemoveStyleInitalizationL3();
	InitBrushes();
	

	ClearPattern();
	
	InitCentiped();

}





function DrawPattern_L2() {

	$('.centipedCircle').css('fill', initColor);

	//Επειδη το maxpaternsixe είναι 4
	for (var i = 0; i < 4; i++) {

		$("#c1_" + i).removeClass('notallowed');
		if (i >= 10) {
			$("#n1_" + i + "_0").removeClass('notallowed');
			$("#n1" + i + "_1").removeClass('notallowed');
		}
		else
			$("#n1_" + i).removeClass('notallowed');

	}

	for (i = 0; i < CentipedeLength; i++) {
		userArray[i] = "";
	}


	var patternSize = ComputePatternSize();
	
	if (patternSize > 0) {
		var colors = [orangeColor, greenColor, pinkColor, purpleColor];

		for (var i = 0; i < patternSize; i++) {
			var randomColor = colors[Math.floor(Math.random() * colors.length)];

			CoreArray[i] = randomColor;
		}

		var fill = patternSize;

		for (var i = 0; i < fill; i++) {

			var colorIndex = i % patternSize;
			var color = CoreArray[colorIndex];

			if (color == "")
				color = initColor;

			$("#c1_" + i).css('fill', color);

			$("#c1_" + i).addClass('notallowed');
			if (i >= 10) {
				$("#n1_" + i + "_0").addClass('notallowed');
				$("#n1" + i + "_1").addClass('notallowed');
			}
			else
				$("#n1_" + i).addClass('notallowed');

		}
	}

}



function CheckPattern_L2() {

	var patternSize = ComputePatternSize();
	var fill = patternSize;
	hasErrors = false;
	for (var i = fill; i < CentipedeLength; i++) {
		var color = i % patternSize;

		

		if (userArray[i] != CoreArray[color]) {
			hasErrors = true;
		}
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