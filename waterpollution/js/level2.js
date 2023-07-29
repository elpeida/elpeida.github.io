function InitLevel2(){
	
	$("#level1").hide();
	$("#level2").show();
	
	InitMainButtons();
	
	InitPressFlags();
	
	InitParatirisiButton();
	
	ShowPolutionButtons();
	
	InitPollutioBuutons_2()
	
	
}
 
 function ShowPolutionButtons(){
	 
	 $("#agroktima_pollution_button").show();
	 $("#agroktima_pollution_button_line").show();
	 $("#ploio_pollution_button").show();
	 $("#ploio_pollution_button_line").show();
	 $("#ergostasio_pollution_button").show();
	 $("#ergostasio_pollution_button_line").show();
	 $("#poli1_pollution_button").show();
	 $("#poli1_pollution_button_line").show();
	 $("#poli2_pollution_button").show();
	 $("#poli2_pollution_button_line").show();
 }
 
 function InitPollutioBuutons_2(){
	 
	  $("#agroktima_pollution_button").unbind('click');
	   $("#agroktima_pollution_button_line").unbind('click');
	   $("#ploio_pollution_button").unbind('click');
	 $("#ploio_pollution_button_line").unbind('click');
	 $("#ergostasio_pollution_button").unbind('click');
	 $("#ergostasio_pollution_button_line").unbind('click');
	 $("#poli1_pollution_button").unbind('click');
	 $("#poli1_pollution_button_line").unbind('click');
	 $("#poli2_pollution_button").unbind('click');
	 $("#poli2_pollution_button_line").unbind('click');
	   
	   
	  InitAgroktimaPollutionButton();
	  InitPloioPollutionButton();
	  InitErgostasioPollutionButton();
	  InitPoli1PollutionButton();
	  InitPoli2PollutionButton();
 }
 
 function InitAgroktimaPollutionButton(){
	 
	 	
	
	 
	 $("#agroktima_pollution_button").bind('click', function(){
		 
		
		 
		 if(ploioPollution == true || ergostasioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(agroktimaPollution == true)
		  {
			  $("#agroktima_pollution").hide();
			  $("#agroktima_pollution_button_line").show()
			  agroktimaPollution = false;
		  }
		  else {
		  	$.stopSound();
		  	$.playSound('./sounds/2_agroktima.mp3');

			  $("#agroktima_pollution").show();
			  $("#agroktima_pollution_button_line").hide()
			  agroktimaPollution = true;
		  }
		  
		  
		  
	  });
	  
	   $("#agroktima_pollution_button_line").bind('click', function(){
		  
		
		 if(ploioPollution == true || ergostasioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(agroktimaPollution == true)
		  {
			  $("#agroktima_pollution").hide();
			  $("#agroktima_pollution_button_line").show()
			  agroktimaPollution = false;
		  }
		  else{
			  $("#agroktima_pollution").show();
			  $("#agroktima_pollution_button_line").hide()
			  agroktimaPollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_agroktima.mp3');
		  }
		  
		  
		  
	  });
 }
 
  function InitPloioPollutionButton()
  {
	
	 
	 $("#ploio_pollution_button").bind('click', function(){
		  
		   if(agroktimaPollution == true || ergostasioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(ploioPollution == true)
		  {
			  $("#ploio_pollution").hide();
			  $("#ploio_pollution_button_line").show()
			  ploioPollution = false;
		  }
		  else{
			  $("#ploio_pollution").show();
			  $("#ploio_pollution_button_line").hide()
			  ploioPollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_ploio.mp3');
		  }
		  
		  
		  
	  });
	  
	   $("#ploio_pollution_button_line").bind('click', function(){
		  $.stopSound();
			$.playSound('./sounds/click.mp3');
		   if(agroktimaPollution == true || ergostasioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(ploioPollution == true)
		  {
			  $("#ploio_pollution").hide();
			  $("#ploio_pollution_button_line").show()
			  ploioPollution = false;
		  }
		  else{
			  $("#ploio_pollution").show();
			  $("#ploio_pollution_button_line").hide()
			  ploioPollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_ploio.mp3');
		  }
		  
		  
		  
	  });
 }
 
 function InitErgostasioPollutionButton()
  {
	 
	
	 $("#ergostasio_pollution_button").bind('click', function(){
		
		 if(agroktimaPollution == true || ploioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		 
		  if(ergostasioPollution == true)
		  {
			  $("#ergostasio_pollution").hide();
			  $("#ergostasio_pollution_button_line").show()
			  ergostasioPollution = false;
		  }
		  else{
			  $("#ergostasio_pollution").show();
			  $("#ergostasio_pollution_button_line").hide()
			  ergostasioPollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_ergostasio.mp3');
		  }
		  
		  
		  
	  });
	  
	   $("#ergostasio_pollution_button_line").bind('click', function(){
		  $.stopSound();
			$.playSound('./sounds/click.mp3');
		  if(agroktimaPollution == true || ploioPollution == true || poli1Pollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(ergostasioPollution == true)
		  {
			  $("#ergostasio_pollution").hide();
			  $("#ergostasio_pollution_button_line").show()
			  ergostasioPollution = false;
		  }
		  else{
			  $("#ergostasio_pollution").show();
			  $("#ergostasio_pollution_button_line").hide()
			  ergostasioPollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_ergostasio.mp3');
		  }
		  
		  
		  
	  });
 }
 
  function InitPoli1PollutionButton()
  {
	 
	
	 $("#poli1_pollution_button").bind('click', function(){
		
		if(agroktimaPollution == true || ploioPollution == true || ergostasioPollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		
		  if(poli1Pollution == true)
		  {
			  $("#poli1_pollution").hide();
			  $("#poli1_pollution_button_line").show()
			  poli1Pollution = false;
		  }
		  else{
			  $("#poli1_pollution").show();
			  $("#poli1_pollution_button_line").hide()
			  poli1Pollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_poli_plastika.mp3');
		  }
		  
		  
		  
	  });
	  
	   $("#poli1_pollution_button_line").bind('click', function(){
		  $.stopSound();
			$.playSound('./sounds/click.mp3');
		  if(agroktimaPollution == true || ploioPollution == true || ergostasioPollution ==true || poli2Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(poli1Pollution == true)
		  {
			  $("#poli1_pollution").hide();
			  $("#poli1_pollution_button_line").show()
			  poli1Pollution = false;
		  }
		  else{
			  $("#poli1_pollution").show();
			  $("#poli1_pollution_button_line").hide()
			  poli1Pollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_poli_plastika.mp3');
		  }
		  
		  
		  
	  });
 }
 
 function InitPoli2PollutionButton()
  {
	 
	
	 $("#poli2_pollution_button").bind('click', function(){
		
		
		if(agroktimaPollution == true || ploioPollution == true || ergostasioPollution ==true || poli1Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		
		  if(poli2Pollution == true)
		  {
			  $(".poli2_pollution").show();
			  $("#poli2_pollution_button_line").show()
			  poli2Pollution = false;
		  }
		  else{
			  $(".poli2_pollution").hide();
			  $("#poli2_pollution_button_line").hide()
			  poli2Pollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_poli_spatali.mp3');
		  }
		  
		  
		  
	  });
	  
	   $("#poli2_pollution_button_line").bind('click', function(){
		  $.stopSound();
			$.playSound('./sounds/click.mp3');
		  if(agroktimaPollution == true || ploioPollution == true || ergostasioPollution ==true || poli1Pollution == true){
			alert("Απενεργοποιήστε όλους τους τύπους μόλυνσης");
			return;
		 }
		  
		  if(poli2Pollution == true)
		  {
			  $(".poli2_pollution").show();
			  $("#poli2_pollution_button_line").show()
			  poli2Pollution = false;
		  }
		  else{
			  $(".poli2_pollution").hide();
			  $("#poli2_pollution_button_line").hide()
			  poli2Pollution = true;
			  $.stopSound();
			  $.playSound('./sounds/2_poli_spatali.mp3');
		  }
		  
		  
		  
	  });
 }