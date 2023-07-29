function InitButtons(){
	
	InitClearButton();
	
	InitLevelButtons();
	
	$("#done").bind('click', function(){
		
		$.stopSound();
		$.playSound('./sounds/click.mp3');

		if(level == 2)
			Check_Level2();
		else if (level == 3)
			Check_Level3();
		else if (level == 4)
			Check_Level4();
		
	});

	$("#replay").bind('click', function () {

		$.stopSound();
		$.playSound('./sounds/click.mp3');

		if (level == 3) {
			GetRandomNumber();
		}
		else if (level == 4) {
			GetRandomBlocks();
		}

	});
}

function InitClearButton(){
	
	$("#clear").unbind('click');
	
	$("#clear").bind('click',function(){
		
		$.stopSound();
		$.playSound('./sounds/click.mp3');

		ClearAll();
		
	});
		
	
}

function ClearAll(){
	
	units = 0;
	dozens = 0;
	hundreds = 0;
	
	units_n = 0;
	units_b = 0;
	
	dozens_n = 0;
	dozens_b = 0;
	
	hundreds_n = 0;
	hundreds_b = 0;
	
	//$("#NUMBERS").find('path').each(function(i,ch){
		
	//	$(ch).hide();
		
	//});
	
	for (var i = 1; i <= 9; i++) {
		$("#n_1_" + i).hide();
		$("#n_10_" + i).hide();
		$("#n_100_" + i).hide();
	}

	$(".block1").hide();
	$(".block10").hide();
	$(".block100").hide();
	
	
	$("#n_1_0").show();
	$("#n_10_0").show();
	$("#n_100_0").show();
	
}
	
function InitLevelButtons(){
	
	$("#next_lvl").bind('click', function (){
		$.stopSound();
		$.playSound('./sounds/level.mp3');
		if(level == 1){
			level = 2;
			$("#l_1").hide();
			$("#l_3").hide();
			$("#l_4").hide();

			$("#l_2").show();
			InitLevel2();
		}
		else if(level == 2){
			level = 3;
			$("#l_1").hide();
			$("#l_2").hide();
			$("#l_4").hide();

			$("#l_3").show();
			InitLevel3();
		}
		else if (level == 3) {
			level = 4;
			$("#l_1").hide();
			$("#l_2").hide();
			$("#l_3").hide();

			$("#l_4").show();
			InitLevel4();
		}
		
		
	});

	$("#previous_lvl").bind('click', function () {
		$.stopSound();
		$.playSound('./sounds/level.mp3');

		if (level == 2) {
			level = 1;
			$("#l_1").show();
			$("#l_2").hide();
			$("#l_3").hide();
			$("#l_4").hide();

			
			InitLevel1();
		}
		else if (level == 3) {
			level = 2;
			$("#l_1").hide();
			$("#l_3").hide();
			$("#l_4").hide();

			$("#l_2").show();
			InitLevel2();
		}
		else if (level == 4) {
			level = 3;
			$("#l_1").hide();
			$("#l_2").hide();
			$("#l_4").hide();

			$("#l_3").show();
			InitLevel3();
		}


	});
	
}

function ShowModal(id, el) {
	

	var h = $("#MAIN_BOXES")[0].getBoundingClientRect().height;
	
	$("#WinImage").css({'height':h, "width":"auto"});
	$("#LooseImage").css({'height':h, "width":"auto"});
	
	
	$(".ModalMessages").hide();
	$('.WinLoose').hide();
	$("#" + el).show();

	$("#" + id).modal('show');


	setTimeout(function () { $("#" + id).modal('hide'); }, 2500);
}