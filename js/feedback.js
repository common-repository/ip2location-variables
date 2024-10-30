jQuery(document).ready(function($) {
	$('#ip2location-variables-feedback-modal').dialog({
		title: 'Quick Feedback',
		dialogClass: 'wp-dialog',
		autoOpen: false,
		draggable: false,
		width: 'auto',
		modal: true,
		resizable: false,
		closeOnEscape: false,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
				
		open: function() {
			$('.ui-widget-overlay').bind('click', function() {
				$('#ip2location-variables-feedback-modal').dialog('close');
			});
		},
			
		create: function() {
			$('.ui-dialog-titlebar-close').addClass('ui-button');
		},
	});

	$('.deactivate a').each(function(i, ele) {
		if ($(ele).attr('href').indexOf('ip2location-variables') > -1) {
			$('#ip2location-variables-feedback-modal').find('a').attr('href', $(ele).attr('href'));

			$(ele).on('click', function(e) {
				e.preventDefault();

				$('#ip2location-variables-feedback-response').html('');
				$('#ip2location-variables-feedback-modal').dialog('open');
			});

			$('input[name="ip2location-variables-feedback"]').on('change', function(e) {
				if($(this).val() == 4) {
					$('#ip2location-variables-feedback-other').show();
				} else {
					$('#ip2location-variables-feedback-other').hide();
				}
			});

			$('#ip2location-variables-submit-feedback-button').on('click', function(e) {
				e.preventDefault();

				$('#ip2location-variables-feedback-response').html('');

				if (!$('input[name="ip2location-variables-feedback"]:checked').length) {
					$('#ip2location-variables-feedback-response').html('<div style="color:#cc0033;font-weight:800">Please select your feedback.</div>');
				} else {
					$(this).val('Loading...');
					$.post(ajaxurl, {
						action: 'ip2location_variables_submit_feedback',
						feedback: $('input[name="ip2location-variables-feedback"]:checked').val(),
						others: $('#ip2location-variables-feedback-other').val(),
					}, function(response) {
						window.location = $(ele).attr('href');
					}).always(function() {
						window.location = $(ele).attr('href');
					});
				}
			});
		}
	});
});