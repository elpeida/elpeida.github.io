function InitChocoPrices() {

	ChocoPrice = 1;

	$('.choco').each(function (i, ch) {

		$(ch).unbind('click');

		$(ch).bind('click', function () {

			ClearIceMaker();
			ClearAll();

			SetChocoPrice();




		});

	});
}

function SetChocoPrice(price) {

	$.stopSound();
	$.playSound('./Sounds/money.mp3');

	if (ChocoPrice == 1) {
		$("#chocoPrice_1").hide();
		$("#chocoPrice_2").show();

		ChocoPrice = 2;
	}

	else if (ChocoPrice == 2) {
		$("#chocoPrice_2").hide();
		$("#chocoPrice_3").show();

		ChocoPrice = 3;
	}

	else if (ChocoPrice == 3) {
		$("#chocoPrice_3").hide();
		$("#chocoPrice_4").show();

		ChocoPrice = 4;
	}

	else if (ChocoPrice == 4) {
		$("#chocoPrice_4").hide();
		$("#chocoPrice_1").show();

		ChocoPrice = 1;
	}

}

function InitChocoBowl() {
	$("#choco_bowl").unbind('click');

	$("#choco_bowl").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (IceMakerBallsCtr == 0) {
			IceMackerBalls[0] = 'chocoBall';
			$("#_1_ball").find('circle').first().removeClass();
			$("#_1_ball").find('circle').first().addClass('chocoBall');
			$("#_1_ball").show();

			IceMakerBallsCtr++;

			IceWeight = IceWeight + 100;
		}
		else if (IceMakerBallsCtr == 1) {
			IceMackerBalls[1] = 'chocoBall';
			$("#_1_ball").hide();
			$("#_2_balls").find('circle').first().removeClass();
			$("#_2_balls").find('circle').last().removeClass();

			$("#_2_balls").find('circle').first().addClass(IceMackerBalls[1]);
			$("#_2_balls").find('circle').last().addClass(IceMackerBalls[0]);

			$("#_2_balls").show();
			IceMakerBallsCtr++;

			IceWeight = IceWeight + 100;
		}

		
		//TotalPrice = TotalPrice + chocoPrice;
	});
}
