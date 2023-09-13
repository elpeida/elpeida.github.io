
function UploadImageByUser(){
	$("#ImageInputID").trigger('click');
}


function InitUserImage(){


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

			

		}
		
				
	let blobURL = URL.createObjectURL(this.files[0]); 

	
	$('body').find("#imageUserHelper").find('img').first().attr('src', blobURL);

	var d = $('body').find("#imageUserHelper").first().clone();
		
	$(d).show();

	 $("body").find('.canvas-container').first().prepend(d); 
	
	 InitDragableItem();  
	
	
	
		
		

	});
}