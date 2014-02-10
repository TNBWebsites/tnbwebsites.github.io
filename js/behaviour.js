var scrollOffset = 60;

var maybePushState = function(url){
	if (history.pushState) history.pushState(null, null, url);
}

$(function(){
	if($(".js-preventOnClick").length > 0) {
		$(".js-preventOnClick").on("click", function(e) {
			e.preventDefault();
		});
	}

	$('#contact').popover({
		placement: "bottom",
		title: "To get in touch with us:",
		content: "Either send an e-mail to <code>kevin.c.lee.sf@gmail.com</code>, or if your e-mail client is well-configured: <p class=\"text-center\" style=\"margin-top: 10px\"><a class=\"btn btn-primary btn-sm\" href=\"mailto:kevin.c.lee.sf@gmail.com\">click here</a></p>",
		html: true,
		container: 'body'
	});

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

	if($("body#home .navbar-brand").length > 0) {
		$("body#home .navbar-brand").on("click", function(e) {
			$("html, body").animate({ scrollTop: 0 });
			$("header li.active").removeClass("active");
			maybePushState("index.html");
			e.preventDefault();
		});
	}

	if($("body#home").length > 0) {
		$('body').scrollspy({ target: '#js-scrollspy', offset: scrollOffset+50 })
		$('#js-scrollspy').on('activate.bs.scrollspy', function(){
			maybePushState($("header li.active a").attr("href"));
		});
	}
})