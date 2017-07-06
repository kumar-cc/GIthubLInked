$(document).ready(function() {

	$('#main .nav-icons ul li').on('mouseenter mouseleave', function(e){
		if (e.type == 'mouseenter'){
			$('#main .nav-icons .nav-icon-tooltip').hide();
			$(this).find('.nav-icon-tooltip').show();
			$('#main .nav-icons ul li a.active').addClass('remove-border');
			$(this).find('.active').removeClass('remove-border')
		} else {
			$('#main .nav-icons .nav-icon-tooltip').hide();
			$('#main .nav-icons .active .nav-icon-tooltip').show();
			$('#main .nav-icons ul li a.active').removeClass('remove-border')
		}
	});

});