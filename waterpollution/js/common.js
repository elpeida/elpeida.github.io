function InitMainButtons(){
	
	InitPressFlags();
	
	$(".mainButtons").unbind('click');
	
	$(".mainButtons").bind('click',function(){
		
		$.stopSound();
			$.playSound('./sounds/click.mp3');
		var id=$(this).attr('id');
		
		
		if (id == "fragmaB" || id == 'fragmaBLetters') {
			fragmaIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_fragma.mp3');


		}
		else if (id == "udragogeioB" || id == 'udragogeioBLetters') {
			udragogeioIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_udragogeio.mp3');
		}
		else if (id == "agroktimaB" || id == 'agroktimaBLetters') {
			agroktimaIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_agroktima.mp3');
		}
		else if (id == "ploioB" || id == 'ploioBLetters') {
			ploioIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_ploio.mp3');
		}
		else if (id == "poliB" || id == 'poliBLetters') {
			poliIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_poli.mp3');
		}
		else if (id == "ergostasioB" || id == 'ergostasioBLetters') {
			ergostasioIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_ergostasio.mp3');
		}
		else if (id == "viologikosB" || id == 'viologikosBLetters') {
			viologikosIsPressed = true;
			$.stopSound();
			$.playSound('./sounds/1_viologikos.mp3');
		}
		
		
		
	});

	$("#molivis").unbind('click');

	$("#molivis").bind('click', function () {

		if (level == 1) {
			$.stopSound();
			$.playSound('./sounds/1_molivis.mp3');
		}
		else if (level == 2) {
			$.stopSound();
			$.playSound('./sounds/2_molivis.mp3');
		}

	});
	
}

function InitParatirisiButton(){
	
	$("#paratirisiB").unbind('click');
	
	$("#paratirisiB").bind('click',function(){
		$.stopSound();
			$.playSound('./sounds/click.mp3');
		
		if(level == 1)
		{
		
			if(fragmaIsPressed)
				$("#img-fragma-container").find('img').first().trigger('click');
			else if(udragogeioIsPressed)
				$("#img-udragogeio-container").find('img').first().trigger('click');
			else if(ergostasioIsPressed)
				$("#img-ergostasio-container").find('img').first().trigger('click');
			
			else if(viologikosIsPressed)
				$("#img-viologikos-container").find('img').first().trigger('click');
			
			else if(poliIsPressed)
				$("#img-poli-container").find('img').first().trigger('click');
			
			
				fragmaIsPressed = false;
				udragogeioIsPressed = false;
				agroktimaIsPressed = false;
				ploioIsPressed = false;
				poliIsPressed = false;
				ergostasioIsPressed = false;
				viologikosIsPressed = false;
			
		}
		
		
		else
		{
			if (ergostasioPollution) {
				$("#img-pol_ergostasio-container").find('img').first().trigger('click');
				$.stopSound();
				$.playSound('./sounds/2_foto_ergostasio.mp3');
			}
			else if (agroktimaPollution) {

				$("#img-pol_farma-container").find('img').first().trigger('click');
				$.stopSound();
				$.playSound('./sounds/2_foto_agroktima.mp3');
			}
			else if (ploioPollution) {
				$("#img-pol_ploio-container").find('img').first().trigger('click');
				$.stopSound();
				$.playSound('./sounds/2_foto_ploio.mp3');
			}
			else if (poli1Pollution) {

				$("#img-pol_plastika-container").find('img').first().trigger('click');
				$.stopSound();
				$.playSound('./sounds/2_foto_plastika.mp3');
			}
			else if (poli2Pollution) {
				$("#img-pol_spatali-container").find('img').first().trigger('click');
				$.stopSound();
				$.playSound('./sounds/2_foto_spatali_nerou.mp3');
			}
		}
	});
	
	
}

function InitPressFlags(){
	
	fragmaIsPressed = false;
	udragogeioIsPressed = false;
	agroktimaIsPressed = false;
	ploioIsPressed = false;
	poliIsPressed = false;
	ergostasioIsPressed = false;
	viologikosIsPressed = false;
	
	agroktimaPollution = false;
	ploioPollution = false;
	ergostasioPollution = false;
	poli1Pollution = false;
	poli2Pollution = false;
}