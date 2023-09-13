function InitLevel1(){
	
	$("#level2").hide();
	$("#level1").show();
	
	InitMainButtons();
	
	InitPressFlags();
	
	InitParatirisiButton();
	
	
	
	HidePollutionButtons();
	
		
}
 
 


function HidePollutionButtons() {

	 $("#agroktima_pollution_button").hide();
	 $("#agroktima_pollution_button_line").hide();
	 $("#ploio_pollution_button").hide();
	 $("#ploio_pollution_button_line").hide();
	 $("#ergostasio_pollution_button").hide();
	 $("#ergostasio_pollution_button_line").hide();
	 $("#poli1_pollution_button").hide();
	 $("#poli1_pollution_button_line").hide();
	 $("#poli2_pollution_button").hide();
	 $("#poli2_pollution_button_line").hide();
}