function InitLevel2(){
	
	ClearAll();
	
	
	InitUnits_2();
	
	InitDozens_2();
	
	InitHundreds_2();
	
	
}
 /********************** Units ***************************************************/
function InitUnits_2(){
	$("#_1-up-green").unbind('click');
	$("#_1-down-green").unbind('click');
	$("#_1-up").unbind('click');
	$("#_1-down").unbind('click');
	
	$("#_1-up-green").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseUnits_2('b');

	});
	
	$("#_1-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseUnits_2('n');

	});
	
		
	
	$("#_1-down-green").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseUnits_2('b');

	});
	
	$("#_1-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseUnits_2('n');

	});

	
	
}

function IncreaseUnits_2(type)
{
	
	if(type=="n")
	{
		
		$("#n_1_" + units_n).hide();
		
		
		if(units_n == 9){
			
			if(hundreds_n == 9 && dozens_n == 9){
				$("#n_1_" + units_n).show();
				return;
			}
			
			units_n = -1;
			MoveUnitToDozen_2('n');
			
		}
	
		units_n++;
		
		$("#n_1_" + units_n).show();
		
	}
	else
	{
		
		if(units_b == 9)
		{
		
			if(hundreds_b == 9 && dozens_b == 9)
			{
				return;
			}
		
			units_b = -1;
			MoveUnitToDozen_2('b');
			$(".block1").hide();
		
		}
	
		units_b++;
	
		$("#b_1_" + units_b).show();
	
	}	
}

function DecreaseUnits_2(type)
{
	if(type == "n")
	{
		if(units_n>0){
			$("#n_1_" + units_n).hide();
			units_n--;
			$("#n_1_" + units_n).show();
		}
	}
	else
	{
		if(units_b>0){
			$("#b_1_" + units_b).hide();
			units_b--;
			
		}
	}	
	
}


function MoveUnitToDozen_2(type){
	if(type == "n")
	{
		IncreaseDozens_2('n');
	}
	else
	{
		var position_one = $("#BLOCK_-_ONE").position();
		var position_ten = $("#DozenBox").position();
		
		var block_one_width = $("#BLOCK_-_ONE")[0].getBoundingClientRect().width;
		var block_one_height = $("#BLOCK_-_ONE")[0].getBoundingClientRect().height;

		var block_ten_width = $("#BLOCK_-_TEN")[0].getBoundingClientRect().width;
		var block_ten_height = $("#BLOCK_-_TEN")[0].getBoundingClientRect().height;

		$("#ten").width(block_one_width);
		$("#ten").height(block_one_height);

		$("#ten").css({ top: position_one.top, left: position_one.left });

		$("#ten").show();

		$("#ten").animate({
			top: position_one.top,
			left: position_ten.left + (position_ten.left / 4)
		}, 1000).fadeOut(500, function(){IncreaseDozens_2('b');});
	}
}
/**************************** Dozens ***********************************************/
function InitDozens_2(){
	$("#_10-up-pink").unbind('click');
	$("#_10-down-pink").unbind('click');
	$("#_10-up").unbind('click');
	$("#_10-down").unbind('click');
	
	$("#_10-up-pink").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseDozens_2('b');

	});
	
	$("#_10-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseDozens_2('n');

	});
	
		
	
	$("#_10-down-pink").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseDozens_2('b');

	});
	
	$("#_10-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseDozens_2('n');

	});

	
	
}

function IncreaseDozens_2(type)
{
	
	if(type=="n")
	{
	
		$("#n_10_" + dozens_n).hide();
		
		
		if(dozens_n == 9){
			
			if(hundreds_n == 9){
				$("#n_10_" + dozens_n).show();	
				return;
			}
			
			dozens_n = -1;
			MoveDozenToΗundred_2('n');
			
		}
		
		dozens_n++;
		
		$("#n_10_" + dozens_n).show();
		
	
	
	}
	else
	{
	
		
		if(dozens_b == 9){
			
			if(hundreds_b == 9){
				return;
			}
			
			dozens_b = -1;
			MoveDozenToΗundred_2('b');
			$(".block10").hide();
		}
		
		dozens_b++;
		
		$("#b_10_" + dozens_b).show();
	
	
	}

	
}

function DecreaseDozens_2(type)
{
	if(type=="n")
	{
		if(dozens_n>0){
			
			$("#n_10_" + dozens_n).hide();
			dozens_n--;
			$("#n_10_" + dozens_n).show();
		}
	}
	else
	{
		if(dozens_b>0){
			$("#b_10_" + dozens_b).hide();
			dozens_b--;
			
		}
	}
	
	
}

function MoveDozenToΗundred_2(type){
	if(type == "n")
	{
		IncreaseHundreds_2('n');
	}
	else
	{
		var position_ten = $("#BLOCK_-_TEN").position();
		
		var position_hundred = $("#HundredBox").position();
				
		var block_ten_width = $("#BLOCK_-_TEN")[0].getBoundingClientRect().width;
		var block_ten_height = $("#BLOCK_-_TEN")[0].getBoundingClientRect().height;

		$("#hundred").width(block_ten_width);
		$("#hundred").height(block_ten_height);

		$("#hundred").css({ top: position_ten.top, left: position_ten.left });

		$("#hundred").show();

		$("#hundred").animate({
			top: position_ten.top,
			left: position_hundred.left + (position_hundred.left / 4)
		}, 1000).fadeOut(500, function(){IncreaseHundreds_2('b');});
	}
}
/**************************** Hundreds ***********************************************/
function InitHundreds_2(){
	$("#_10-up-pink-2").unbind('click');
	$("#_10-down-pink-2").unbind('click');
	$("#_100-up").unbind('click');
	$("#_100-down").unbind('click');
	
	$("#_10-up-pink-2").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseHundreds_2('b');

	});
	
	$("#_100-up").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		IncreaseHundreds_2('n');

	});
	
		
	
	$("#_10-down-pink-2").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseHundreds_2('b');

	});
	
	$("#_100-down").bind('click',function(){
		$.stopSound();
		$.playSound('./sounds/click.mp3');
		DecreaseHundreds_2('n');

	});

	
	
}

function IncreaseHundreds_2(type)
{
		
	if(type == "n")
	{
		$("#n_100_" + hundreds_n).hide();	

		if(hundreds_n == 9)
		{
			$("#n_100_" + hundreds_n).show();	
			return;
		
		}

		hundreds_n++;
		
		$("#n_100_" + hundreds_n).show();
		
	}
	else
	{
		if(hundreds_b == 9)
		{
			$("#n_100_" + hundreds_b).show();	
			return;
		}

		hundreds_b++;
		
		$("#b_100_" + hundreds_b).show();
	}

	
}

function DecreaseHundreds_2(type)
{
	
	if(type == "n")
	{
		if(hundreds_n>0){
			$("#n_100_" + hundreds_n).hide();
			hundreds_n--;
			$("#n_100_" + hundreds_n).show();
		}
	}
	else
	{
		if(hundreds_b>0){
			$("#b_100_" + hundreds_b).hide();
			hundreds_b--;
		}
	}
	
	
}
/******************************************************************/
function Check_Level2(){
	
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