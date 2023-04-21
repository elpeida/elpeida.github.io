function InitPistachioPrices() {

	PistachioPrice = 1;

	$('.pistachio').each(function (i, ch) {

		$(ch).unbind('click');

		$(ch).bind('click', function () {

			ClearIceMaker();
			ClearAll();
			SetPistachioPrice();




		});

	});
}

function SetPistachioPrice(price) {

	$.stopSound();
	$.playSound('./Sounds/money.mp3');

	if (PistachioPrice == 1) {
		$("#pistachioPrice_1").hide();
		$("#pistachioPrice_2").show();

		PistachioPrice = 2;
	}

	else if (PistachioPrice == 2) {
		$("#pistachioPrice_2").hide();
		$("#pistachioPrice_3").show();

		PistachioPrice = 3;
	}

	else if (PistachioPrice == 3) {
		$("#pistachioPrice_3").hide();
		$("#pistachioPrice_4").show();

		PistachioPrice = 4;
	}

	else if (PistachioPrice == 4) {
		$("#pistachioPrice_4").hide();
		$("#pistachioPrice_1").show();

		PistachioPrice = 1;
	}

}

function InitPistachioBowl() {
	$("#pistachio_bowl").unbind('click');

	$("#pistachio_bowl").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (IceMakerBallsCtr == 0) {
			IceMackerBalls[0] = 'pistachioBall';
			$("#_1_ball").find('circle').first().removeClass();
			$("#_1_ball").find('circle').first().addClass('pistachioBall');
			$("#_1_ball").show();

			IceMakerBallsCtr++;

			IceWeight = IceWeight + 1000;
		}
		else if (IceMakerBallsCtr == 1) {
			IceMackerBalls[1] = 'pistachioBall';
			$("#_1_ball").hide();
			$("#_2_balls").find('circle').first().removeClass();
			$("#_2_balls").find('circle').last().removeClass();

			$("#_2_balls").find('circle').first().addClass(IceMackerBalls[1]);
			$("#_2_balls").find('circle').last().addClass(IceMackerBalls[0]);

			$("#_2_balls").show();
			IceMakerBallsCtr++;

			IceWeight = IceWeight + 1000;
		}

		
		//TotalPrice = TotalPrice + chocoPrice;
	});
}
