function InitLevel1(){
	
	ClearAll();
	
	
	InitUnits_1();
	
	InitDozens_1();
	
	InitHundreds_1();
	
	
}
 /********************** Units ***************************************************/
function InitUnits_1(){
	$("#_1-up-green").unbind('click');
	$("#_1-down-green").unbind('click');
	$("#_1-up").unbind('click');
	$("#_1-down").unbind('click');
	
	$("#_1-up-green").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseUnits_1();

	});
	
	$("#_1-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseUnits_1();

	});
	
		
	
	$("#_1-down-green").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseUnits_1();

	});
	
	$("#_1-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseUnits_1();

	});

	
	
}

function IncreaseUnits_1()
{
	
	
	$("#n_1_" + units).hide();
		
		
	if(units == 9){
		
		if(hundreds == 9 && dozens == 9){
			$("#n_1_" + units).show();
			return;
		}
		
		units = -1;
		MoveUnitToDozen();
		$(".block1").hide();
		
	}
	
	
	units++;
	
	$("#n_1_" + units).show();
	$("#b_1_" + units).show();
}

function DecreaseUnits_1()
{
	if(units>0){
			$("#b_1_" + units).hide();
			$("#n_1_" + units).hide();
			units--;
			$("#n_1_" + units).show();
		}
}


function MoveUnitToDozen(){
	
	var position_one = $("#BLOCK_-_ONE").position();
	var position_ten = $("#DozenBox").position();
	
	var block_one_width = $("#BLOCK_-_ONE")[0].getBoundingClientRect().width;
	var block_one_height = $("#BLOCK_-_ONE")[0].getBoundingClientRect().height;

	var block_ten_width = $("#BLOCK_-_TEN")[0].getBoundingClientRect().width;
	var block_ten_height = $("#BLOCK_-_TEN")[0].getBoundingClientRect().height;

	var dozenBoxW = $("#DozenBox")[0].getBoundingClientRect().width;

	$("#ten").width(block_one_width);
	$("#ten").height(block_one_height);

	$("#ten").css({ top: position_one.top, left: position_one.left });

	$("#ten").show();

	$("#ten").animate({
		top: position_one.top,
		left: position_ten.left + (dozenBoxW / 2)
	}, 1000).fadeOut(500, function(){IncreaseDozens_1();});
}
/**************************** Dozens ***********************************************/
function InitDozens_1(){
	$("#_10-up-pink").unbind('click');
	$("#_10-down-pink").unbind('click');
	$("#_10-up").unbind('click');
	$("#_10-down").unbind('click');
	
	$("#_10-up-pink").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');

		IncreaseDozens_1();

	});
	
	$("#_10-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseDozens_1();

	});
	
		
	
	$("#_10-down-pink").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseDozens_1();

	});
	
	$("#_10-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseDozens_1();

	});

	
	
}

function IncreaseDozens_1()
{
	

	$("#n_10_" + dozens).hide();
		
		
		if(dozens == 9){
			
			if(hundreds == 9){
				$("#n_10_" + dozens).show();	
				return;
			}
			
			dozens = -1;
			MoveDozenToΗundred();
			$(".block10").hide();
		}
		
		dozens++;
		
		$("#n_10_" + dozens).show();
		$("#b_10_" + dozens).show();
}

function DecreaseDozens_1()
{
	if(dozens>0){
			$("#b_10_" + dozens).hide();
			$("#n_10_" + dozens).hide();
			dozens--;
			$("#n_10_" + dozens).show();
		}
}

function MoveDozenToΗundred(){
	var position_ten = $("#BLOCK_-_TEN").position();
	
	var position_hundred = $("#HundredBox").position();
			
	var block_ten_width = $("#BLOCK_-_TEN")[0].getBoundingClientRect().width;
	var block_ten_height = $("#BLOCK_-_TEN")[0].getBoundingClientRect().height;

	$("#hundred").width(block_ten_width);
	$("#hundred").height(block_ten_height);

	$("#hundred").css({ top: position_ten.top, left: position_ten.left });

	$("#hundred").show();

	var hunderdBoxW = $("#HundredBox")[0].getBoundingClientRect().width;
	
	var a = position_hundred.left + hunderdBoxW /3;// + (position_hundred.left / 8.0);
	

	$("#hundred").animate({
		top: position_ten.top,
		left: a
	}, 1000).fadeOut(500, function(){IncreaseHundreds_1();});
}
/**************************** Hundreds ***********************************************/
function InitHundreds_1(){
	$("#_10-up-pink-2").unbind('click');
	$("#_10-down-pink-2").unbind('click');
	$("#_100-up").unbind('click');
	$("#_100-down").unbind('click');
	
	$("#_10-up-pink-2").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseHundreds_1();

	});
	
	$("#_100-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseHundreds_1();

	});
	
		
	
	$("#_10-down-pink-2").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseHundreds_1();

	});
	
	$("#_100-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseHundreds_1();

	});

	
	
}

function IncreaseHundreds_1()
{

	$("#n_100_" + hundreds).hide();	

	if(hundreds == 9){
		$("#n_100_" + hundreds).show();	
		return;
		// hundreds = -1;
		// $(".block100").hide();
	}

		hundreds++;
		
		$("#n_100_" + hundreds).show();
		$("#b_100_" + hundreds).show();
}

function DecreaseHundreds_1()
{
	if(hundreds>0){
			$("#b_100_" + hundreds).hide();
			$("#n_100_" + hundreds).hide();
			hundreds--;
			$("#n_100_" + hundreds).show();
		}
}