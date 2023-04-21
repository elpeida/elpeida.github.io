function InitLevel2()
{
	console.log('InitLevel2');
	TotalPrice = 0;

	IceMakerBallsCtr = 0;
	IceMackerBalls = [];
	PriceListArr = [];
	IceWeight = 0;

	HidePriceLists_2();
	

	HidePriceListBalls_2();

	HidePriceListPrices_2();

	HideIceCreamMakerBalls();

	ShowChocalateBowl();

	HidePistachioBall();

	InitChocoBowl();

	InitChocoPrices();

	InitAllBowlPrices();
}

function HidePriceLists_2() {
	$("#lvl_1_-_timokatalogos").hide();
	$("#lvl_3_-_timokatalogos").hide();

	$("#lvl_2_-_timokatalogos").show();
}

function HidePriceListBalls_2() {

	$(".l2_priceListBalls").hide();

}

function HidePriceListPrices_2() {
	$(".l2_priceListPrice").hide();
}


function ShowChocalateBowl() {
	$("#choco_bowl").show();
	$(".chocoRectPrice").show();
	$("#chocoPrice_1").show();
}
	
