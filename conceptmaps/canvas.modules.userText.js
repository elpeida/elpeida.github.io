

function  ShowTextInput(){

	$('#TextModal').modal('show');

}


function HideText(){
	$("#message-text").val('');

	$('#TextModal').modal('hide');
}
function SubmitText(){

	var userText = $("#message-text").val();

	var d = $('<div style="font-size:3vh;white-space:nowrap;">' + userText + '</div>');
	
	$("body").find('.canvas-container').first().prepend(d); 
	
	InitDragableItem();  

	$("#message-text").val('');

	$('#TextModal').modal('hide');
}