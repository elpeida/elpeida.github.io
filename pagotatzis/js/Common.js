function HideIceCreamMakerBalls() {
	$("#_2_balls").hide();
	$("#_1_ball").hide();

}

function InitDoneButon() {
	
	$("#done").unbind('click');
	$("#done").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (IceMackerBalls.length > 0) {
			var found = -1;
			for (var i = 0; i < PriceListArr.length; i++) {
				if (PriceListArr[i] == IceWeight)
					found = i;
			}

			ComputeTotalPrice();

			if (found > -1 && i > 0) {

				$("#l" + level + "_priceList_pos" + found).css("filter", "drop-shadow(0px 0px 15px rgb(249 0 0/ 1)");
				$.stopSound();
				$.playSound('./Sounds/wrong.wav');
				setTimeout(function () {
					$("#l" + level + "_priceList_pos" + found).css("filter", "none");
					
				}, 1000);
			}
			else {
				
				if (IceMakerBallsCtr == 1) {
					$("#l" + level + "_pr" + i + "_1b").find('circle').first().addClass(IceMackerBalls[0]);
					$("#l" + level + "_pr" + i + "_1b").show();
					PriceListArr[i] = IceWeight;
					$("#l" + level + "_pr" + i + "_pr" + TotalPrice).show();
					CheckForWin();
				}
				else if (IceMakerBallsCtr == 2) {
					$("#l" + level + "_pr" + i + "_2b").find('circle').first().addClass(IceMackerBalls[0]);
					$("#l" + level + "_pr" + i + "_2b").find('circle').last().addClass(IceMackerBalls[1]);
					$("#l" + level + "_pr" + i + "_2b").show();
					PriceListArr[i] = IceWeight;
					$("#l" + level + "_pr" + i + "_pr" + TotalPrice).show();
					CheckForWin();
				}
			}

			ClearIceMaker();
		}
	});
	
}

function InitEraseButton() {

	$("#erase_ball").unbind('click');
	$("#erase_ball").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/thrash.mp3');

		ClearIceMaker();

	});

}

function ClearIceMaker() {
	$("#_2_balls").hide();
	$("#_1_ball").hide();
	IceWeight = 0;
	IceMakerBallsCtr = 0;
	IceMackerBalls = [];
	TotalPrice = 0;

	
}

function ClearAll() {
	ClearIceMaker();
	$('circle').removeClass();
	if (level == 1) {
		HidePriceListBalls_1();
		HidePriceListPrices_1();
		PriceListArr = [];
	}
	if (level == 2) {
		HidePriceListBalls_2();
		HidePriceListPrices_2();
		PriceListArr = [];
	}
	if (level == 3) {
		HidePriceListBalls_3();
		HidePriceListPrices_3();
		PriceListArr = [];
	}
}
function InitEraseAllButton() {
	$("#erase_all").unbind('click');
	$("#erase_all").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/thrash.mp3');

		ClearIceMaker();
		ClearAll();

	});

	
}

function ComputeTotalPrice() {
	TotalPrice = 0;
	
	for (var i = 0; i < IceMackerBalls.length; i++) {

		if (IceMackerBalls[i] == 'bananaBall') {
			TotalPrice = TotalPrice + BananaPrice;
		}

		if (IceMackerBalls[i] == 'strawberryBall' )
			TotalPrice = TotalPrice + StrawberryPrice;

		if (IceMackerBalls[i] == 'chocoBall')
			TotalPrice = TotalPrice + ChocoPrice

		if (IceMackerBalls[i] == 'pistachioBall')
			TotalPrice = TotalPrice + PistachioPrice;
	}
	
}

function ShowModal(id, el) {
	$(".ModalMessages").hide();

	$("#" + el).show();

	$("#" + id).modal('show');


	setTimeout(function () { $("#" + id).modal('hide'); }, 3500);
}

function CheckForWin() {

	

	if (level == 1 && PriceListArr.length == 5) {
		$.stopSound();
		$.playSound('./Sounds/win.wav');
		ShowModal('HelpModal', 'win');
	}
	else if (level == 2 && PriceListArr.length == 9) {
		$.stopSound();
		$.playSound('./Sounds/win.wav');
		ShowModal('HelpModal', 'win');
	}
	else if (level == 3 && PriceListArr.length == 14) {
		$.stopSound();
		$.playSound('./Sounds/win.wav');
		ShowModal('HelpModal', 'win');
	}

}

function InitNextLevel() {

	$("#next_lvl").unbind('click');

	$("#next_lvl").bind('click', function () {

		if (level == 1) {
			$.stopSound();
			$.playSound('./Sounds/Level.mp3');
			level = 2;
			InitLevel2();
			$("#l_1").hide();
			$("#l_3").hide();
			$("#l_2").show();
		}

		else if (level == 2) {
			$.stopSound();
			$.playSound('./Sounds/Level.mp3');
			level = 3;
			InitLevel3();
			$("#l_1").hide();
			$("#l_2").hide();
			$("#l_3").show();
		}


	});
}

function InitPreviousLevel() {

	$("#previous_lvl").unbind('click');

	$("#previous_lvl").bind('click', function () {

		if (level == 2) {
			$.stopSound();
			$.playSound('./Sounds/Level.mp3');
			level = 1;
			InitLevel1();
			$("#l_3").hide();
			$("#l_2").hide();
			$("#l_1").show();
			
		}
		if (level == 3) {
			$.stopSound();
			$.playSound('./Sounds/Level.mp3');
			level = 2;
			InitLevel2();
			$("#l_1").hide();
			$("#l_3").hide();
			$("#l_2").show();
			

		}


	});
}
	
function InitAllBowlPrices() {
	if (level == 1) {
		BananaPrice = 1;
		StrawberryPrice = 1;
		$("#bananaPrice_1").show();
		$("#bananaPrice_2").hide();
		$("#bananaPrice_3").hide();
		$("#bananaPrice_4").hide();

		$("#strawberryPrice_1").show();
		$("#strawberryPrice_2").hide();
		$("#strawberryPrice_3").hide();
		$("#strawberryPrice_4").hide();
	}
	else if (level == 2) {
		BananaPrice = 1;
		StrawberryPrice = 1;
		ChocoPrice = 1;
		$("#bananaPrice_1").show();
		$("#bananaPrice_2").hide();
		$("#bananaPrice_3").hide();
		$("#bananaPrice_4").hide();

		$("#strawberryPrice_1").show();
		$("#strawberryPrice_2").hide();
		$("#strawberryPrice_3").hide();
		$("#strawberryPrice_4").hide();

		$("#chocoPrice_1").show();
		$("#chocoPrice_2").hide();
		$("#chocoPrice_3").hide();
		$("#chocoPrice_4").hide();
	}
	else if (level == 3) {
		BananaPrice = 1;
		StrawberryPrice = 1;
		ChocoPrice = 1;
		PistachioPrice = 1;
		$("#bananaPrice_1").show();
		$("#bananaPrice_2").hide();
		$("#bananaPrice_3").hide();
		$("#bananaPrice_4").hide();

		$("#strawberryPrice_1").show();
		$("#strawberryPrice_2").hide();
		$("#strawberryPrice_3").hide();
		$("#strawberryPrice_4").hide();

		$("#chocoPrice_1").show();
		$("#chocoPrice_2").hide();
		$("#chocoPrice_3").hide();
		$("#chocoPrice_4").hide();

		$("#pistachioPrice_1").show();
		$("#pistachioPrice_2").hide();
		$("#pistachioPrice_3").hide();
		$("#pistachioPrice_4").hide();
	}

	
}

function InitExtraHelpButton() {

	$("#help").unbind('click');

	$("#help").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		for (var i = 0; i<PriceListArr.length ;i++)
			console.log(PriceListArr[i]);

		if (MissingBananas() ) {
			$.stopSound();
			$.playSound('./Sounds/banana.mp3');
			return;
		}
		if (MissingStrawberries()) {
			$.stopSound();
			$.playSound('./Sounds/strawberry.mp3');
			return;
		}
		if (MissingChocos()) {
			$.stopSound();
			$.playSound('./Sounds/choko.mp3');
			return;
		}
		if (MissingPistachios()) {
			$.stopSound();
			$.playSound('./Sounds/pistachio.mp3');
			return;
		}
	});

	$("#molivis").unbind('click');

	$("#molivis").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/Instructions.mp3');

		
	});

}

function MissingBananas() {
	if (level == 1) {
		if (PriceListArr.indexOf(1) > -1 && PriceListArr.indexOf(2) > -1 && PriceListArr.indexOf(11) > -1)
			return false;
		else
			return true;
	}

	if (level == 2) {
		if (PriceListArr.indexOf(1) > -1 && PriceListArr.indexOf(2) > -1 && PriceListArr.indexOf(11) > -1 && PriceListArr.indexOf(101) > -1)
			return false;
		else
			return true;
	}

	if (level == 3) {
		if (PriceListArr.indexOf(1) > -1 && PriceListArr.indexOf(2) > -1 && PriceListArr.indexOf(11) > -1 && PriceListArr.indexOf(101) > -1 && PriceListArr.indexOf(1001) > -1)
			return false;
		else
			return true;
	}
}

function MissingStrawberries() {
	if (level == 1) {
		if (PriceListArr.indexOf(10) > -1 && PriceListArr.indexOf(11) > -1 && PriceListArr.indexOf(20) > -1)
			return false;
		else
			return true;
	}

	if (level == 2) {
		if (PriceListArr.indexOf(10) > -1 && PriceListArr.indexOf(11) > -1 && PriceListArr.indexOf(20) > -1 && PriceListArr.indexOf(110) > -1)
			return false;
		else
			return true;
	}

	if (level == 3) {
		if (PriceListArr.indexOf(10) > -1 && PriceListArr.indexOf(11) > -1 && PriceListArr.indexOf(20) > -1 && PriceListArr.indexOf(110) > -1 && PriceListArr.indexOf(1010) > -1)
			return false;
		else
			return true;
	}
}


function MissingChocos() {
	if (level == 2) {
		if (PriceListArr.indexOf(100) > -1 && PriceListArr.indexOf(101) > -1 && PriceListArr.indexOf(110) > -1 && PriceListArr.indexOf(200) > -1)
			return false;
		else
			return true;
	}

	if (level == 3) {
		if (PriceListArr.indexOf(100) > -1 && PriceListArr.indexOf(101) > -1 && PriceListArr.indexOf(110) > -1 && PriceListArr.indexOf(200) > -1 && PriceListArr.indexOf(1100) > -1)
			return false;
		else
			return true;
	}
}

function MissingPistachios() {
	if (level == 3) {
		if (PriceListArr.indexOf(1000) > -1 && PriceListArr.indexOf(2000) > -1 && PriceListArr.indexOf(1001) > -1 && PriceListArr.indexOf(1010) > -1 && PriceListArr.indexOf(1100) > -1)
			return false;
		else
			return true;
	}
}