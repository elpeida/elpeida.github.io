function InitLevel1()
{
	TotalPrice = 0;

	IceMakerBallsCtr = 0;
	IceMackerBalls = [];
	PriceListArr = [];
	IceWeight = 0;

	HidePriceLists_1();
	

	HidePriceListBalls_1();

	HidePriceListPrices_1();

	HideIceCreamMakerBalls();

	HideChocalateBall();

	HidePistachioBall();

	InitStrawberryPrices();

	InitBananaPrices();

	InitBananaBowl();

	InitStrawberryBowl();

	InitDoneButon();

	InitEraseButton();

	InitEraseAllButton();

	InitAllBowlPrices();
	
}

function HidePriceLists_1() {
	$("#lvl_2_-_timokatalogos").hide();
	$("#lvl_3_-_timokatalogos").hide();

	$("#lvl_1_-_timokatalogos").show();
}

function HidePriceListBalls_1() {

	$(".l1_priceListBalls").hide();

}

function HidePriceListPrices_1() {
	$(".l1_priceListPrice").hide();
}



function HideChocalateBall() {
	$("#choco_bowl").hide();
	$(".chocoRectPrice").hide();
	$("#chocoPrice_1").hide();
	$("#chocoPrice_2").hide();
	$("#chocoPrice_3").hide();
	$("#chocoPrice_4").hide();
}

function HidePistachioBall() {
	$("#pistachio_bowl").hide();
	$(".pistachioRectPrice").hide();
	$("#pistachioPrice_1").hide();
	$("#pistachioPrice_2").hide();
	$("#pistachioPrice_3").hide();
	$("#pistachioPrice_4").hide();
}
	
