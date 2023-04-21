function InitStrawberryPrices() {

	StrawberryPrice = 1;

	$('.strawberry').each(function (i, ch) {

		$(ch).unbind('click');

		$(ch).bind('click', function () {

			ClearIceMaker();
			ClearAll();

			SetStrawberryPrice();




		});

	});
}

function SetStrawberryPrice(price) {

	$.stopSound();
	$.playSound('./Sounds/money.mp3');

	if (StrawberryPrice == 1) {
		$("#strawberryPrice_1").hide();
		$("#strawberryPrice_2").show();

		StrawberryPrice = 2;
	}

	else if (StrawberryPrice == 2) {
		$("#strawberryPrice_2").hide();
		$("#strawberryPrice_3").show();

		StrawberryPrice = 3;
	}

	else if (StrawberryPrice == 3) {
		$("#strawberryPrice_3").hide();
		$("#strawberryPrice_4").show();

		StrawberryPrice = 4;
	}

	else if (StrawberryPrice == 4) {
		$("#strawberryPrice_4").hide();
		$("#strawberryPrice_1").show();

		StrawberryPrice = 1;
	}

}

function InitStrawberryBowl() {
	$("#strawberry_bowl").unbind('click');

	$("#strawberry_bowl").bind('click', function () {

		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (IceMakerBallsCtr == 0) {
			IceMackerBalls[0] = 'strawberryBall';
			$("#_1_ball").find('circle').first().removeClass();
			$("#_1_ball").find('circle').first().addClass('strawberryBall');
			$("#_1_ball").show();

			IceMakerBallsCtr++;

			IceWeight = IceWeight + 10;
		}
		else if (IceMakerBallsCtr == 1) {
			IceMackerBalls[1] = 'strawberryBall';
			$("#_1_ball").hide();
			$("#_2_balls").find('circle').first().removeClass();
			$("#_2_balls").find('circle').last().removeClass();

			$("#_2_balls").find('circle').first().addClass(IceMackerBalls[1]);
			$("#_2_balls").find('circle').last().addClass(IceMackerBalls[0]);

			$("#_2_balls").show();
			IceMakerBallsCtr++;

			IceWeight = IceWeight + 10;
		}

		
		//TotalPrice = TotalPrice + StrawberryPrice;
	});
}
