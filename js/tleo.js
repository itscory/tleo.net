$(document).ready(function() {

	var current = $(".navPage .home");

	$(document).click(function() {
		$(".collapse").collapse('hide');
	});

	$('li a').click(function(e) {
		var $this = $(this);
		if (!$this.parent().hasClass('active')) {
			$('li.active').removeClass('active');
			$this.parent().addClass('active');
		}
		//e.preventDefault();
	});
	$("#home-button").click(function(){
		$("#footer").fadeOut(300);
		current.fadeOut(300, function() {
			$(".navPage .home").fadeIn();
			$("#footer").fadeIn();
		});
		current = $(".navPage .home");
	});
	$("#about-button").click(function(){
		$("#footer").fadeOut(300);
		current.fadeOut(300, function() {
			$(".navPage .about").fadeIn();
			$("#footer").fadeIn();
		});
		current = $(".navPage .about");
	});

	$("#contact-button").click(function(){
		$("#footer").fadeOut(300);
		current.fadeOut(300, function() {
			$(".navPage .contact").fadeIn();
			$("#footer").fadeIn();
		});
		current = $(".navPage .contact");
	});
	$("#submit-button").click(function(e){
		startLoadingAnimation();
		e.preventDefault();
	});

	var hash = document.URL.substr(document.URL.indexOf('#')+1);
	if(hash.indexOf('/') !== -1) {
		hash = "";
	}else{
		console.log("Destination: "+ hash);
	}

	var interfaces = ["home", "about", "contact"];

	if (interfaces.indexOf(hash) > -1) {
		$("#"+hash+"-button").click();
	}else{
		$(".navPage .home").fadeIn();
	}

	$("#footer").fadeIn();

	$('#name').bind('keyup', function(){
		checkNameField();
	});

	$('#email').bind('keyup', function(){
		checkEmailField();
	});

	$('#message').bind('keyup', function(){
		checkMessageField();
	});
	
});

function submitForm(){
	checkNameField();
	checkEmailField();
	checkMessageField();

	var formName = document.getElementById('name').value
	var formEmail = document.getElementById('email').value
	var formMessage = document.getElementById('message').value
	var emailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if (formName != "" && formEmail != "" && formMessage != "" && emailValidation.test(formEmail))
	{
		$.post("post.php",
		{
			form_name: formName,
			form_email: formEmail,
			form_message: formMessage
		},
		function(data, status){
			stopLoadingAnimation();
			if (status == "success") {
				if (data == "1") {
					alert("Your message was successfully sent!");
					window.location.href = "/";
				} else if (data == "0") {
					alert("Something went wrong! Please try again.");
				} else if (data == "2") {
					alert("The server thinks you aren't sending anything... can you try that again?\nError: 0x20");
				} else {
					alert("The server isn't responding. Please refresh the page and try again.\nError: 0x10");
				}
			}else{
				alert("We couldn't connect to our server! Please check your internet connection and try again.\nError: 0x30");
			}
		});
	}
}

function startLoadingAnimation(){
	var loadingIcon = $('#submit-button').find(".glyphicon");
	if (!loadingIcon.hasClass('glyphicon-refresh')){
		$('#submit-label').fadeOut(0);
		loadingIcon.addClass('glyphicon-refresh');
		loadingIcon.addClass('glyphicon-refresh-animate');
	}
}

function stopLoadingAnimation(){
	var loadingIcon = $('#submit-button').find(".glyphicon");
	if (loadingIcon.hasClass('glyphicon-refresh')){
		$('#submit-label').fadeIn(0);
		loadingIcon.removeClass('glyphicon-refresh');
		loadingIcon.removeClass('glyphicon-refresh-animate');
	}
}

function checkNameField(){
	var formName = document.getElementById('name').value

	if (formName.length < 3) {
		if (!$('#name-fg').hasClass('has-error')){
			if ($('#name-fg').hasClass('has-success')){
				$('#name-fg').removeClass('has-success');
				$('#name-feedback-icon').removeClass('glyphicon-ok')
			}
			$('#name-fg').addClass('has-error');
			$('#name-feedback-icon').addClass('glyphicon-remove')
		}
	}else{
		if (!$('#name-fg').hasClass('has-success')){
			if ($('#name-fg').hasClass('has-error')){
				$('#name-fg').removeClass('has-error');
				$('#name-feedback-icon').removeClass('glyphicon-remove')

			}
			$('#name-fg').addClass('has-success');
			$('#name-feedback-icon').addClass('glyphicon-ok')
		}
	}
}

function checkEmailField(){
	var formEmail = document.getElementById('email').value
	var emailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	if (!emailValidation.test(formEmail)) {
		if (!$('#email-fg').hasClass('has-error')){
			if ($('#email-fg').hasClass('has-success')){
				$('#email-fg').removeClass('has-success');
				$('#email-feedback-icon').removeClass('glyphicon-ok')
			}
			$('#email-fg').addClass('has-error');
			$('#email-feedback-icon').addClass('glyphicon-remove')
		}
	}else{
		if (!$('#email-fg').hasClass('has-success')){
			if ($('#email-fg').hasClass('has-error')){
				$('#email-fg').removeClass('has-error');
				$('#email-feedback-icon').removeClass('glyphicon-remove')

			}
			$('#email-fg').addClass('has-success');
			$('#email-feedback-icon').addClass('glyphicon-ok')
		}
	}
}

function checkMessageField(){
	var formName = document.getElementById('message').value

	if (formName.length < 10) {
		if (!$('#message-fg').hasClass('has-error')){
			if ($('#message-fg').hasClass('has-success')){
				$('#message-fg').removeClass('has-success');
				$('#message-feedback-icon').removeClass('glyphicon-ok')
			}
			$('#message-fg').addClass('has-error');
			$('#message-feedback-icon').addClass('glyphicon-remove')
		}
	}else{
		if (!$('#message-fg').hasClass('has-success')){
			if ($('#message-fg').hasClass('has-error')){
				$('#message-fg').removeClass('has-error');
				$('#message-feedback-icon').removeClass('glyphicon-remove')

			}
			$('#message-fg').addClass('has-success');
			$('#message-feedback-icon').addClass('glyphicon-ok')
		}
	}
}
