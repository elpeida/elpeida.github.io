function InitLevel1() {
	
	level = 1;
	userArray = [];
	CoreArray = [];
	CoreArray2 = [];

	$(".LevelNumber").html(1);

	$("#ElegxosDiv").prev().show();
	$("#ElegxosDiv").hide();

	$("#Level4_Synnefo").hide();
	$("#Level2_Synnefo").hide();
	$("#Level1_Synnefo").show();

	brushColor = "";

	RemoveBrushClasses();

	InitBrushes();

	ClearPattern();

	InitPattern();
		 
	RemoveStyleInitalizationL3();

	InitCentiped();
	

}



function DrawPattern_L1() {

	$('.centipedCircle').css('fill', initColor);

	var patternSize = 3;
	while (CoreArray[patternSize] == "") {
		patternSize--;
	}
	
	patternSize = patternSize + 1;
	
	
	for (var i = 0; i < CentipedeLength; i++) {

		var colorIndex = i % patternSize;
		var color = CoreArray[colorIndex];

		if (color == "")
			color = initColor;

		$("#c1_" + i).css('fill', color);

	}


}




