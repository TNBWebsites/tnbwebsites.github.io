/* Offsetting the scroll sensors (because of the fixed nav) */
var scrollOffset = 60;

/* Easier pushState */
var maybePushState = function(url){
	if (history.pushState) history.pushState(null, null, url);
}

$(function(){
	/* Easier preventDefault */
	if($(".js-preventOnClick").length > 0) {
		$(".js-preventOnClick").on("click", function(e) {
			e.preventDefault();
		});
	}

	/* Popover on the contact menu entry */
	$('#contact').popover({
		placement: "bottom",
		title: "To get in touch with us:",
		content: "Either send an e-mail to <code>kevin.c.lee.sf@gmail.com</code>, or if your e-mail client is well-configured: <p class=\"text-center\" style=\"margin-top: 10px\"><a class=\"btn btn-primary btn-sm\" href=\"mailto:kevin.c.lee.sf@gmail.com\">click here</a></p>",
		html: true,
		container: 'body'
	});

	/** INTERNAL NAVIGATION ON HOMEPAGE */
	if($("body#home").length > 0) {

		/* Handling the click on the nav */
		if($(".js-scrollTo").length > 0) {
			$(".js-scrollTo").on("click", function(e) {
				var targetStr = $(this).attr("href");
				$("html, body").animate({ scrollTop: $(targetStr).offset().top - scrollOffset });
				maybePushState(targetStr);
				$("header li.active").removeClass("active");
				$(this).parent().addClass("active");
				e.preventDefault();
			});
		}

		/* Handling the click on the logo */
		if($(".navbar-brand").length > 0) {
			$(".navbar-brand").on("click", function(e) {
				$("html, body").animate({ scrollTop: 0 });
				$("header li.active").removeClass("active");
				maybePushState("index.html");
				e.preventDefault();
			});
		}

		/* Handling the scrollspy (changing state and nav when user scrolls) */
		$('body').scrollspy({ target: '#js-scrollspy', offset: scrollOffset+50 }) // changing nav
		$('#js-scrollspy').on('activate.bs.scrollspy', function(){ // changing state
			maybePushState($("header li.active a").attr("href"));
		});

		/* Handling the user that arrives with an anchored URL */
		if (window.location.hash.length>1) {
			setTimeout(function(){$("html, body").scrollTop($(window.location.hash).offset().top - scrollOffset)}, 500);
		}
	}
})