	jQuery(document).ready(function($){

				//function reloadCaptcha(){ $("#captchax").attr("src","./smart-form/contact/php/captcha/captcha.php?r=" + Math.random()); }
				//$('.captcode').click(function(e){
				//	e.preventDefault();
				//	reloadCaptcha();
				//});
				
				function swapButton(){
					var txtswap = $(".form-footer button[type='submit']");
					if (txtswap.text() == txtswap.data("btntext-sending")) {
						txtswap.text(txtswap.data("btntext-original"));
					} else {
						txtswap.data("btntext-original", txtswap.text());
						txtswap.text(txtswap.data("btntext-sending"));
					}
				}
			   
				$( "#smart-form" ).validate({
				
						/* @validation states + elements 
						------------------------------------------- */
						errorClass: "state-error",
						validClass: "state-success",
						errorElement: "em",
						onkeyup: false,
						onclick: false,
						
						/* @validation rules 
						------------------------------------------ */
						rules: {
								sendername: {
										required: true,
										minlength: 1
								},		
								emailaddress: {
										required: true,
										email: true
								},
								sendersubject: {
										required: true,
										minlength: 1
								},								
								sendermessage: {
										required: true,
										minlength: 1
								},
								//captcha:{
								//	required:true,
								//	remote:'./smart-form/contact/php/captcha/process.php'
								//}
						},
						messages:{
								sendername: {
										required: 'Enter your name',
										minlength: 'Name must not be empty'
								},				
								emailaddress: {
										required: 'Enter your email address',
										email: 'Enter a VALID email address'
								},
								sendersubject: {
										required: 'Subject is important',
										minlength: 'Subject must not be empty'
								},														
								sendermessage: {
										required: 'Oops you forgot your message',
										minlength: 'Message must not be empty'
								},															
								//captcha:{
								//		required: 'You must enter the captcha code',
								//		remote:'Captcha code is incorrect'
								//}
						},

						/* @validation highlighting + error placement  
						---------------------------------------------------- */
						highlight: function(element, errorClass, validClass) {
								$(element).closest('.field').addClass(errorClass).removeClass(validClass);
						},
						unhighlight: function(element, errorClass, validClass) {
								$(element).closest('.field').removeClass(errorClass).addClass(validClass);
						},
						errorPlacement: function(error, element) {
						   if (element.is(":radio") || element.is(":checkbox")) {
									element.closest('.option-group').after(error);
						   } else {
									error.insertAfter(element.parent());
						   }
						},
						
						/* @ajax form submition 
						---------------------------------------------------- */						
						submitHandler:function(form) {
							$(form).ajaxSubmit({
								    target:'.result',			   
									beforeSubmit:function(){ 
											swapButton();
											$('.form-footer').addClass('progress');
									},
									error:function(){
											swapButton();
											$('.form-footer').removeClass('progress');
									},
									 success:function(){
										 	swapButton();
											$('.form-footer').removeClass('progress');
											$('.alert-success').show().delay(7000).fadeOut();
											$('.field').removeClass("state-error, state-success");
											if( $('.alert-error').length == 0){
												$('#smart-form').resetForm();
												//reloadCaptcha();
											}
									 }
							  });
						}
						
				});		
		
	});				
    