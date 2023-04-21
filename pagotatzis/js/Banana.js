function InitBananaPrices() {

	BananaPrice = 1;
	
	$('.banana').each(function (i, ch) {

		$(ch).unbind('click');

		$(ch).bind('click', function () {

			$.stopSound();
			$.playSound('./Sounds/money.mp3');
			ClearIceMaker();
			ClearAll();

			SetBananaPrice();




		});

	});
}

function SetBananaPrice(price) {
	if (BananaPrice == 1) {
		$("#bananaPrice_1").hide();
		$("#bananaPrice_2").show();

		BananaPrice = 2;
	}

	else if (BananaPrice == 2) {
		$("#bananaPrice_2").hide();
		$("#bananaPrice_3").show();

		BananaPrice = 3;
	}

	else if (BananaPrice == 3) {
		$("#bananaPrice_3").hide();
		$("#bananaPrice_4").show();

		BananaPrice = 4;
	}

	else if (BananaPrice == 4) {
		$("#bananaPrice_4").hide();
		$("#bananaPrice_1").show();

		BananaPrice = 1;
	}

	
}

function InitBananaBowl() {
	$("#banana_bowl").unbind('click');

	$("#banana_bowl").bind('click', function () {
		$.stopSound();
		$.playSound('./Sounds/click.mp3');

		if (IceMakerBallsCtr == 0) {
			IceMackerBalls[0] = 'bananaBall';
			$("#_1_ball").find('circle').first().removeClass();
			$("#_1_ball").find('circle').first().addClass('bananaBall');
			$("#_1_ball").show();

			IceMakerBallsCtr++;

			IceWeight = IceWeight + 1;
		}
		else if (IceMakerBallsCtr == 1) {
			IceMackerBalls[1] = 'bananaBall';
			$("#_1_ball").hide();
			$("#_2_balls").find('circle').first().removeClass();
			$("#_2_balls").find('circle').last().removeClass();

			$("#_2_balls").find('circle').first().addClass(IceMackerBalls[1]);
			$("#_2_balls").find('circle').last().addClass(IceMackerBalls[0]);

			$("#_2_balls").show();
			IceMakerBallsCtr++;

			IceWeight = IceWeight + 1;
		}

		
		//TotalPrice = TotalPrice + BananaPrice;
	});
}


