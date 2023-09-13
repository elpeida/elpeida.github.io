function InitLevel4(){
	
	ClearAll();
	
	
	InitUnits_4();
	
	InitDozens_4();
	
	InitHundreds_4();
	
	
}
 /********************** Units ***************************************************/
function InitUnits_4() {
	$("#_1-up-green").unbind('click');
	$("#_1-down-green").unbind('click');
	$("#_1-up").unbind('click');
	$("#_1-down").unbind('click');
	
	//$("#_1-up-green").bind('click',function(){
				
	//	IncreaseUnits_2('b');

	//});
	
	$("#_1-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseUnits_2('n');

	});
	
		
	
	//$("#_1-down-green").bind('click',function(){
		
	//	DecreaseUnits_2('b');

	//});
	
	$("#_1-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseUnits_2('n');

	});

	
	
}


/**************************** Dozens ***********************************************/
function InitDozens_4(){
	$("#_10-up-pink").unbind('click');
	$("#_10-down-pink").unbind('click');
	$("#_10-up").unbind('click');
	$("#_10-down").unbind('click');
	
	//$("#_10-up-pink").bind('click',function(){
				
	//	IncreaseDozens_2('b');

	//});
	
	$("#_10-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseDozens_2('n');

	});
	
		
	
	//$("#_10-down-pink").bind('click',function(){
		
	//	DecreaseDozens_2('b');

	//});
	
	$("#_10-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseDozens_2('n');

	});

	
	
}


/**************************** Hundreds ***********************************************/
function InitHundreds_4(){
	$("#_10-up-pink-2").unbind('click');
	$("#_10-down-pink-2").unbind('click');
	$("#_100-up").unbind('click');
	$("#_100-down").unbind('click');
	
	//$("#_10-up-pink-2").bind('click',function(){
				
	//	IncreaseHundreds_2('b');

	//});
	
	$("#_100-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseHundreds_2('n');

	});
	
		
	
	//$("#_10-down-pink-2").bind('click',function(){
		
	//	DecreaseHundreds_2('b');

	//});
	
	$("#_100-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseHundreds_2('n');

	});

	
	
}


/******************************************************************/
function Check_Level4(){
	
	var hasErrors = false;
	
	if(units_b!=units_n || dozens_b!=dozens_n || hundreds_b!=hundreds_n)
		hasErrors = true;
	
	
	if (hasErrors) {
		ShowModal('WinLoseModal', 'lost');
		$.stopSound();
		$.playSound('./sounds/fail.wav');
	}
	else {
		ShowModal('WinLoseModal', 'win');
		$.stopSound();
		$.playSound('./sounds/win.wav');
	}
	
}

function GetRandomBlocks() {

	ClearAll();

	units_b = numbers[Math.floor(Math.random() * numbers.length)];
	dozens_b = numbers[Math.floor(Math.random() * numbers.length)];
	hundreds_b = numbers[Math.floor(Math.random() * numbers.length)];

	for (var i = 0; i <= units_b; i++) {
		$("#b_1_" + i).show();
	}

	for (var i = 0; i <= dozens_b; i++) {
		$("#b_10_" + i).show();
	}

	for (var i = 0; i <= hundreds_b; i++) {
		$("#b_100_" + i).show();
	}
	
}