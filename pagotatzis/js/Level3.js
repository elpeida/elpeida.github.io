function InitLevel3()
{
	console.log('InitLevel2');
	TotalPrice = 0;

	IceMakerBallsCtr = 0;
	IceMackerBalls = [];
	PriceListArr = [];
	IceWeight = 0;

	HidePriceLists_3();
	

	HidePriceListBalls_3();

	HidePriceListPrices_3();

	HideIceCreamMakerBalls();

	ShowPistachioBowl();

	InitPistachioBowl();

	InitPistachioPrices();

	InitAllBowlPrices();
}

function HidePriceLists_3() {
	$("#lvl_1_-_timokatalogos").hide();
	$("#lvl_2_-_timokatalogos").hide();
	$("#lvl_3_-_timokatalogos").show();
}

function HidePriceListBalls_3() {

	$(".l3_priceListBalls").hide();

}

function HidePriceListPrices_3() {
	$(".l3_priceListPrice").hide();
}


function ShowPistachioBowl() {
	$("#pistachio_bowl").show();
	$(".pistachioRectPrice").show();
	$("#pistachioPrice_1").show();
}
	
