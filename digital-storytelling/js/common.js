function SubmitText(el) {

	var id = $(el).attr('data-id');

	var text = $("textarea").val();

	$("#" + id).text(text);
	$("#Book" + id).text(text);
	if (id == "Title" || id == "SubTitle" || id == "EndTitle") {
		$("#Slide" + id).text(text);
		$("#Book" + id).text(text);
		$("#Print" + id).text(text);
	}
	else {
		var bookId = id.replace('Capture', 'BookText');
		$("#" + bookId).text(text);

		var printId = id.replace('Capture', 'PrintText');
		$("#" + printId).text(text);
	}

	$('#TextModal').modal('hide');

	$("#Book" + id).text(text);
	

}
function createPDF() {
	playClick();
	$("#PrintArea").printThis();

}


function addSlide() {

	playClick();
	
	slide++;

	var element = $("#HiddenSlide").html();
	var elementText = $("#HiddenSlideText").html();

	var sideElement = $("#HiddenSideSlide").html();

	var bookElement = $("#HiddenBookArea").html();

	var printElement = $("#HiddenPrintSlide").html();
	

	$('#mainRow').find(".SlideText").last().after($(elementText)).after($(element));

	$('#mainRow').find('.SoundInput').last().attr('data-soundID', slide);
	$('#mainRow').find('.PlaySound').last().attr('data-soundID', slide);
	$('#mainRow').find('.DeleteSound').last().attr('data-soundID', slide);

	$('#mainRow1').find(".SideSlide").last().parent().before($(sideElement));

	$("#LastBookItem").before($(bookElement));

	$("#PrintEndSlide").before($(printElement));

	UpdateIndexes();
	Page.update();
}



function removeSlide(el) {
	playClick();

	var id = $(el).parents('.SideSlide').first().attr('id');
	
	var l = $("#mainRow1").find('.SideSlide').length;
	
	if (l == 3) {
		$(".ModalMessages").hide();
		$("#ModalMessage_DeleteFirstSlide").show();
		$("#HelpModal").modal('show');
	}
	else {
		
		$(el).parents('.SideSlide').first().parents('div').first().remove();
		var slideID = id.replace('Side', '');
		$('#' + slideID).remove();

		var slideTextID = id.replace('SideSlide', 'SlideText');
		$('#' + slideTextID).remove();

		var bookImageID = id.replace('SideSlide', 'BookImage');
		$('#' + bookImageID).parents('div').first().remove();
		
		var printImageID = id.replace('Side', 'Print');
		$('#' + printImageID).parents('div').first().remove();
		
		UpdateIndexes();
		Page.update();
	}
}

function MoveUp(el) {
	playClick();
	var id = $(el).parents('.SideSlide').first().attr('id');

	if (id == 'SideSlide1') {
		$(".ModalMessages").hide();
		$("#ModalMessage_MoveUp").show();
		$("#HelpModal").modal('show');
	}
	else {
		
		var htmlToMove = $(el).parents('.SideSlideContainer').first();

		var up = $(htmlToMove).prev();

		htmlToMove.insertBefore($(up));

		

		/*****************************************/
		//Swap Main Slide
		var mainSlideID = id.replace('Side', '');
		var htmlToMove1 = $("#" + mainSlideID);

		var up1 = $(htmlToMove1).prev().prev();

		htmlToMove1.insertBefore($(up1));
		/*****************************************/
		//Swap SlideText
		var slideTextID = id.replace('SideSlide', 'SlideText');
		var htmlToMove2 = $("#" + slideTextID);

		var up2 = $(htmlToMove2).prev().prev();

		htmlToMove2.insertBefore($(up2));
		/*****************************************/
		//Swap book Slide
		var bookID = id.replace('Side', 'Book');
		var htmlToMove3 = $("#" + bookID);

		var up3 = $(htmlToMove3).prev()

		htmlToMove3.insertBefore($(up3));

		/*****************************************/
		//Swap print Slide
		var printID = id.replace('Side', 'Print');

		var htmlToMove4 = $("#" + printID).parents('.PrintSlideContainer').first();

		var up4 = $(htmlToMove4).prev();

		htmlToMove4.insertBefore($(up4));

		UpdateIndexes();
		Page.update();
	}
}

function MoveDown(el) {
	playClick();
	var id = $(el).parents('.SideSlide').first().attr('id');

	
	var htmlToMove = $(el).parents('.SideSlideContainer').first();

	var down = $(htmlToMove).next();

	if ($(down).hasClass('SideSlideEndContainer')) {
		$(".ModalMessages").hide();
		$("#ModalMessage_MoveDown").show();
		$("#HelpModal").modal('show');
	}
	else {
		htmlToMove.insertAfter($(down));


		/*****************************************/
		//Swap Main Slide
		var mainSlideID = id.replace('Side', '');
		var htmlToMove1 = $("#" + mainSlideID);

		var down1 = $(htmlToMove1).next().next().next();

		htmlToMove1.insertAfter($(down1));
		/*****************************************/
		//Swap SlideText
		var slideTextID = id.replace('SideSlide', 'SlideText');
		var htmlToMove2 = $("#" + slideTextID);

		var down2 = $(htmlToMove2).next().next().next();

		htmlToMove2.insertAfter($(down2));
		/*****************************************/
		//Swap book Slide
		var bookID = id.replace('Side', 'Book');
		var htmlToMove3 = $("#" + bookID);

		var down3 = $(htmlToMove3).next()

		htmlToMove3.insertAfter($(down3));

		/*****************************************/
		//Swap print Slide
		var printID = id.replace('Side', 'Print');

		var htmlToMove4 = $("#" + printID).parents('.PrintSlideContainer').first();

		var down4 = $(htmlToMove4).next();

		htmlToMove4.insertAfter($(down4));


		UpdateIndexes();
		Page.update();
	}
	
}


function createBook() {
	playClick();
	$("#BookModal").modal('show');

	$("#bb-bookblock").find('.bb-item').each(function (i, ch) {

		if ($(ch).css('display') == "block") {
			if (i == 0) {
				$.stopSound();
				$.playSound(audioTitle);
			}
			else if (i == $("#bb-bookblock").find('.bb-item').length-1) {
				$.stopSound();
				$.playSound(audioEnd);
			}
			else {
				var id = $(ch).attr('id');
				var soundInputID = id.replace('BookSlide', 'SoundInput');
				var soundID = $("#" + soundInputID).attr('data-soundID');

				for (var i = 0; i < audio.length; i++) {
					var id = audio[i].id;

					if (id == soundID) {
						$.stopSound();
						$.playSound(audio[i].url);
					}
				}
			}
		}
	});

	
	
}

function encodeImgtoBase64(element) {

	var img = element.files[0];

	var reader = new FileReader();

	reader.onloadend = function () {

		$("#convertImg").attr("href", reader.result);

		$("#convertImg").text(reader.result);

		$("#displayImg").attr("src", reader.result);
	}
	
	imageData = reader.readAsDataURL(img);
}


function playClick() {
	$.stopSound();
	$.playSound('./Sounds/click.mp3');
}



function InitTextSlides(id) {
	$("#EditSlide"+id+"_Text").on('click', function () {

		$("#SubmitButton").attr('data-id', 'Slide'+id+'_Text');

		var titleText = $('#Slide' + id + '_Text').text();


		$("textarea").val(titleText);
		$('#TextModal').modal('show');

	});
}



function PlayBookSound() {


	
}

function UpdateIndexes() {

	var slideCtr = 1;
	$(".Slide").each(function (i, ch) {

		if ($(ch).attr('id') == 'SlideFirst' || $(ch).attr('id') == 'SlideLast') {
			;
		}
		else {
			var id = "Slide" + slideCtr;
			
			$(ch).attr('id', id);

			slideCtr++;
		}

	});

	$(".EditImage").each(function (i, ch) {

		var id = "EditImage" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".DeleteImage").each(function (i, ch) {

		var id = "DeleteImage" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".SlideHeader").each(function (i, ch) {
		var n = i + 1;
		var id = "SlideHeader" + (i + 1);

		$(ch).attr('id', id);

		$(ch).text($(ch).attr('data-title') + " "+ n);
	});

	$(".SlideText").each(function (i, ch) {

		var id = "SlideText" + (i + 1);

		$(ch).attr('id', id);
		

	});

	$(".Capture").each(function (i, ch) {

		var id = "Capture" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".EditText").each(function (i, ch) {

		var id = "EditText" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".DeleteText").each(function (i, ch) {

		var id = "DeleteText" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".EditSound").each(function (i, ch) {

		var id = "EditSound" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".DeleteSound").each(function (i, ch) {

		var id = "DeleteSound" + (i + 1);

		$(ch).attr('id', id);

	});

	var slideCtr = 1;
	$(".SideSlide").each(function (i, ch) {

		if ($(ch).attr('id') == 'SideSlideFirst' || $(ch).attr('id') == 'SideSlideLast') {
			;
		}
		else {
			var id = "SideSlide" + slideCtr;

			$(ch).attr('id', id);

			slideCtr++;
		}
	});

	$(".SideSlideHeader").each(function (i, ch) {
		var n = i + 1;
		var id = "SideSlideHeader" + (i + 1);

		$(ch).attr('id', id);

		$(ch).text($(ch).attr('data-title') + " " + n);

	});

	$(".ImageInput").each(function (i, ch) {
		var n = i + 1;
		var id = "ImageInput" + (i + 1);

		$(ch).attr('id', id);

		

	});

	$(".SoundInput").each(function (i, ch) {
		var n = i + 1;
		var id = "SoundInput" + (i + 1);

		$(ch).attr('id', id);



	});
	

	$(".BookSlide").each(function (i, ch) {
		var n = i + 1;
		var id = "BookSlide" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".BookImage").each(function (i, ch) {
		var n = i + 1;
		var id = "BookImage" + (i + 1);

		$(ch).attr('id', id);

	});

	$(".BookText").each(function (i, ch) {
		var n = i + 1;
		var id = "BookText" + (i + 1);

		$(ch).attr('id', id);

	});

	$("#PrintArea").find(".PrintImage").each(function (i, ch) {
		var n = i + 1;
		var id = "PrintImage" + (i + 1);

		$(ch).attr('id', id);

	});

	$("#PrintArea").find(".PrintText").each(function (i, ch) {
		var n = i + 1;
		var id = "PrintText" + (i + 1);

		$(ch).attr('id', id);

	});

	$("#PrintArea").find(".PrintSlide").each(function (i, ch) {
		var n = i + 1;
		var id = "PrintSlide" + (i + 1);

		$(ch).attr('id', id);

	});
	
	InitImageInputs();
	InitSoundInputs();
	InitTextInputs();
	InitButtons();
}

function InitButtons() {
	$(".SideSlide").unbind('click');

	$(".SideSlide").bind('click', function () {
		
		var id = $(this).attr('id');

		var newID = "#" + id.replace("Side", "");
		var scrollTo = $(newID);
		var position = scrollTo.offset().top - $("#mainRow2").offset().top + $("#mainRow2").scrollTop();
		
		$("#mainRow2").animate({
			scrollTop: position
		}, 1000);

	});


	$(".EditImage").unbind('click');

	$(".EditImage").bind('click', function () {

		playClick();

		var imageID = $(this).attr('id').replace('EditImage', 'ImageInput');
		
		$("#" + imageID).trigger('click');

	});

	$(".DeleteImage").unbind('click');


	$(".DeleteImage").bind('click', function () {

		playClick();

		var slideID = $(this).attr('id').replace('DeleteImage', 'Slide');

		DeleteImage(slideID)

	});

	$(".EditSound").unbind('click');

	$(".EditSound").bind('click', function () {

		playClick();

		var soundID = $(this).attr('id').replace('EditSound', 'SoundInput');

		$("#" + soundID).trigger('click');

	});

	$(".PlaySound").unbind('click');

	$(".PlaySound").bind('click', function () {


		var currentID = $(this).attr('data-soundID');

		for (var i = 0; i < audio.length; i++) {
			var id = audio[i].id;
			
			if (id == currentID) {
				$.stopSound();
				$.playSound(audio[i].url);
			}
		}
	});

	$(".DeleteSound").unbind('click');

	$(".DeleteSound").bind('click', function () {

		playClick();

		var currentID = $(this).attr('data-soundID');
		
		for (var i = 0; i < audio.length; i++) {
			var id = audio[i].id;

			if (id == currentID) {
				audio[i].url = "";
			}
		}
		$('body').find('.SoundInput[data-soundid="' + currentID + '"]').val('');
	});

	$("#PlayAgainBtn").unbind('click');

	$("#PlayAgainBtn").bind('click', function () {

		var currentID = $(this).attr('data-soundID');
		if (currentID == '0') {
			$.stopSound();
			$.playSound(audioTitle);
		}
		else if (currentID == '-1') {
			$.stopSound();
			$.playSound(audioEnd);
		}
		else {
			for (var i = 0; i < audio.length; i++) {
				var id = audio[i].id;

				if (id == currentID) {
					$.stopSound();
					$.playSound(audio[i].url);
				}
			}
		}

	});
	InitTitleButtons();

	

	
}

function InitTitleButtons() {
	$("#EditTitle_Sound").unbind('click');

	$("#EditTitle_Sound").bind('click', function () {

		playClick();

		$("#SoundInput_Title").trigger('click');

	});

	$("#PlayTitle_Sound").unbind('click');

	$("#PlayTitle_Sound").bind('click', function () {

		$.stopSound();
		$.playSound(audioTitle);

	});

	$("#DeleteTitle_Sound").unbind('click');

	$("#DeleteTitle_Sound").bind('click', function () {
		playClick();
		audioTitle = "";
		$("#SoundInput_Title").val('');
	});

	$("#EditEnd_Sound").unbind('click');

	$("#EditEnd_Sound").bind('click', function () {
		playClick();
		$("#SoundInput_End").trigger('click');

	});

	$("#PlayEnd_Sound").unbind('click');

	$("#PlayEnd_Sound").bind('click', function () {

		$.stopSound();
		$.playSound(audioEnd);

	});

	$("#DeleteEnd_Sound").unbind('click');

	$("#DeleteEnd_Sound").bind('click', function () {
		playClick();
		audioEnd = "";
		$("#SoundInput_End").val('');
	});
}

function DeleteImage(id) {

	const elem = document.getElementById(id);
	elem.style.backgroundImage = "none";

	var slideHeaderID = id.replace("Slide", "SlideHeader");
	$("#" + slideHeaderID).show();
		

	var sideslideID = id.replace("Slide", "SideSlide");
	const sideslideElem = document.getElementById(sideslideID);
	var sideslideHeaderID = id.replace("Slide", "SideSlideHeader");

	
	sideslideElem.style.backgroundImage = "none";
	$("#" + sideslideHeaderID).show();
}

function InitImageInputs() {
	$(".ImageInput").unbind('change');
	$(".ImageInput").change(function (e) {


		//Initiate the FileReader object.
		var reader = new FileReader();
		//Read the contents of Image File.
		reader.readAsDataURL(this.files[0]);
		reader.onload = function (e) {
			//Initiate the JavaScript Image object.
			var image = new Image();

			//Set the Base64 string return from FileReader as source.
			image.src = e.target.result;

			//Validate the File Height and Width.
			//image.onload = function () {
			//	var height = this.height;
			//	var width = this.width;
			//	$("#image1").removeClass();
			//	if (height > width) {
			//		$("#image1").addClass('height100');
			//	}
			//	else {
			//		$("#image1").addClass('width100');
			//	}

			//};

		}

		var slideHeaderID = $(this).attr('id').replace('ImageInput', 'SlideHeader');
		var slideID = $(this).attr('id').replace('ImageInput', 'Slide');
		
		var sideSlideHeaderID = $(this).attr('id').replace('ImageInput', 'SideSlideHeader');
		var sideSlideID = $(this).attr('id').replace('ImageInput', 'SideSlide');

		var printImageID = $(this).attr('id').replace('ImageInput', 'PrintImage');

		var bookImageID = $(this).attr('id').replace('ImageInput', 'BookImage');

		$("#" + slideHeaderID).hide();
		$("#" + sideSlideHeaderID).hide();

		let blobURL = URL.createObjectURL(this.files[0]);
		const elem = document.getElementById(slideID);
		const sideelem = document.getElementById(sideSlideID);
		

		elem.style.backgroundImage = "url(" + blobURL + ")";
		sideelem.style.backgroundImage = "url(" + blobURL + ")";
		
		$("#" + printImageID).attr('src', blobURL);

		$("#" + bookImageID).attr('src', blobURL);

	});
}

function InitSoundInputs() {
	$(".SoundInput").unbind('change');
	$(".SoundInput").change(function (e) {
		var found = false;
		var audioObj = {
			"id": $(this).attr('data-soundID'),
			"url":URL.createObjectURL(this.files[0])
		};
		
		for (var i = 0; i < audio.length; i++) {
			if (audio[i].id == audioObj.id) {
				audio[i].url = audioObj.url;
				found = true;
			}
		}
		if(found == false)
			audio.push(audioObj);

	});

	$("#SoundInput_Title").unbind('change');
	$("#SoundInput_Title").change(function (e) {

		audioTitle = URL.createObjectURL(this.files[0]);
		
	});

	$("#SoundInput_End").unbind('change');
	$("#SoundInput_End").change(function (e) {

		audioEnd = URL.createObjectURL(this.files[0]);

	});
}

function InitTextInputs() {

	$("#EditTitle").unbind('click');

	$("#EditTitle").bind('click', function () {

		playClick();
		var id = $(this).attr('id');
		
		var modalTitle = $(this).attr('data-title');

		$("#TextModalTitle").text(modalTitle);

		var titleText = $("#Title").text();

		$("textarea").val(titleText);

		$("#SubmitButton").attr('data-id', "Title");

		$('#TextModal').modal('show');
	});

	$("#DeleteTitle").unbind('click');

	$("#DeleteTitle").bind('click', function () {
		
		playClick();

		$("#Title").text($("#Title").attr('data-title'));
		$("#SlideTitle").text($("#Title").attr('data-title'));
		
		$("#BookTitle").text('');
		$("#PrintTitle").text('');
		
	});

	$("#EditSubTitle").unbind('click');

	$("#EditSubTitle").bind('click', function () {
		playClick();

		var id = $(this).attr('id');

		var modalTitle = $(this).attr('data-title');


		$("#TextModalTitle").text(modalTitle);

		var titleText = $("#SubTitle").text();

		$("textarea").val(titleText);

		$("#SubmitButton").attr('data-id', "SubTitle");

		$('#TextModal').modal('show');
	});


	$("#DeleteSubTitle").unbind('click');

	$("#DeleteSubTitle").bind('click', function () {

		playClick();

		$("#SubTitle").text($("#SubTitle").attr('data-title'));
		$("#SlideSubTitle").text($("#SubTitle").attr('data-title'));

		$("#BookSubTitle").text('');
		$("#PrintSubTitle").text('');

	});


	$("#EditEndTitle").unbind('click');

	$("#EditEndTitle").bind('click', function () {

		playClick();
		var id = $(this).attr('id');

		var modalTitle = $(this).attr('data-title');


		$("#TextModalTitle").text(modalTitle);

		var titleText = $("#EndTitle").text();

		$("textarea").val(titleText);

		$("#SubmitButton").attr('data-id', "EndTitle");

		$('#TextModal').modal('show');
	});

	$("#DeleteEndTitle").unbind('click');

	$("#DeleteEndTitle").bind('click', function () {

		playClick();

		$("#EndTitle").text($("#EndTitle").attr('data-title'));
		$("#SlideEndTitle").text($("#EndTitle").attr('data-title'));

		$("#BookEndTitle").text('');
		$("#PrintEndTitle").text('');

	});

	$(".EditText").unbind('click');

	$(".EditText").bind('click', function () {

		playClick();
		var id = $(this).attr('id');
		
		var modalTitle = $("#" + id.replace('EditText', 'SlideHeader')).text();

		//console.log("modalTitle = " + modalTitle);

		var captureID = id.replace('EditText', 'Capture');

		$("#TextModalTitle").text(modalTitle);

		var titleText = $("#" + captureID).text();
		$("textarea").val(titleText);
		
		$("#SubmitButton").attr('data-id', captureID);

		$('#TextModal').modal('show');
	});

	$(".DeleteText").unbind('click');

	$(".DeleteText").bind('click', function () {

		playClick();
		var id = $(this).attr('id');

		var captureID = id.replace('DeleteText', 'Capture');
		var bookTextID = id.replace('DeleteText', 'BookText');
		var printTextID = id.replace('DeleteText', 'PrintText');
		
		$("#" + captureID).text('');
		$("#" + bookTextID).text('');
		$("#" + printTextID).text('');

	});
}


var Page = (function () {

	var config = {
		$bookBlock: $('#bb-bookblock'),
		$navNext: $('#bb-nav-next'),
		$navPrev: $('#bb-nav-prev'),
		$navFirst: $('#bb-nav-first'),
		$navLast: $('#bb-nav-last')
	},
		init = function () {
			config.$bookBlock.bookblock({
				
			
				speed: 800,
				shadowSides: 1,
				shadowFlip: 1,
				onBeforeFlip: function (page) {
					$.stopSound();
					$.playSound('./Sounds/flip.mp3');
				},
				onEndFlip: function (old, page, isLimit) {
					

					

					if (page == 0) {
						$.stopSound();
						$.playSound(audioTitle);
						$("#PlayAgainBtn").attr('data-soundID', '0');
					}
					else if (isLimit && page > 0) {
						$.stopSound();
						$.playSound(audioEnd);
						$("#PlayAgainBtn").attr('data-soundID', '-1');
					}
					else {
						var currentID = $("#SoundInput" + page).attr('data-soundID');
						$("#PlayAgainBtn").attr('data-soundID', currentID);
						for (var i = 0; i < audio.length; i++) {
							var id = audio[i].id;

							if (id == currentID) {
								$.stopSound();
								$.playSound(audio[i].url);
							}
						}
					}
					

					return false;
				},
			});
			initEvents();
		},
		destroy = function () {
			config.$bookBlock.bookblock('destroy');
			return false;
		},
		first = function () {
			config.$bookBlock.bookblock('first');
			return false;
		},
		update = function () {
			config.$bookBlock.bookblock('update');
		},
		initEvents = function () {

			var $slides = config.$bookBlock.children();

			// add navigation events
			config.$navNext.on('click touchstart', function (event) {
				bookSlide++;
				config.$bookBlock.bookblock('next');
				PlayBookSound();
				return false;
			});

			config.$navPrev.on('click touchstart', function () {
				bookSlide--;
				config.$bookBlock.bookblock('prev');
				PlayBookSound();
				return false;
			});

			config.$navFirst.on('click touchstart', function () {
				bookSlide = 1;
				config.$bookBlock.bookblock('first');
				PlayBookSound();
				return false;
			});

			config.$navLast.on('click touchstart', function () {
				bookSlide = $("#bb-bookblock").find('.bb-item').length;
				config.$bookBlock.bookblock('last');
				PlayBookSound();
				return false;
			});

			// add swipe events
			//$slides.on({
			//	'swipeleft': function (event) {
			//		debugger;
			//		bookSlide++;
			//		config.$bookBlock.bookblock('next');
			//		PlayBookSound();
			//		return false;
			//	},
			//	'swiperight': function (event) {
			//		bookSlide--;
			//		config.$bookBlock.bookblock('prev');
			//		PlayBookSound();
			//		return false;
			//	}
			//});

			// add keyboard events
			$(document).keydown(function (e) {
				var keyCode = e.keyCode || e.which,
					arrow = {
						left: 37,
						up: 38,
						right: 39,
						down: 40
					};

				switch (keyCode) {
					case arrow.left:
						bookSlide--;
						config.$bookBlock.bookblock('prev');
						PlayBookSound();
						break;
					case arrow.right:
						bookSlide++;
						PlayBookSound();
						config.$bookBlock.bookblock('next');
						break;
				}
			});
		};

	return { init: init, destroy: destroy, update: update, first:first };

})();