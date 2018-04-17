//For touch devices
//USING each function
$(".card").each(function() {
	var $card = $(this);
	var $activeCardImg = $card.find(".imgBx");
		var $activeCardImgNav = $card.find(".imgBx nav");
	var $activeDetails = $card.find(".details");
	var $detailsNav = $card.find(".details nav");

	$activeCardImgNav.on("touchstart", function(e) {
		$activeDetails.removeClass("detailsBGtouch");
		$(this).css("left", "-110%");
		$activeDetails.css("left", "0%");
		e.preventDefault();
	});

	$detailsNav.on("touchstart", function(e) {
		$activeDetails.addClass("detailsBGtouch");
		//$(this).animate("left", "100%");
		$activeDetails.delay(0).animate(
			{ left: "100%" },
			{
				duration: "fast", // how fast we are animating
				easing: "swing", // the type of easing
				complete: function() {
					// the callback
					console.log("callback close details");
				}
			}
		);
		$activeCardImg.css("left", "0%");
		$activeCardImgNav.css("left", "0%");
		e.preventDefault();
	});
});

$(".details").find('a').on("click touchstart", function() {
	//$('.log').css("opacity", "1");
	//$(this).delay(5000).animate("opacity", "0");
	$(".logtxt").animate(
		{ opacity: "1" },
		{
			complete: function() {
				// the callback
				$(".logtxt").delay(1000).animate({ opacity: "0" });
			}
		}
	);
});

function isMobileDevice() {
	var isTouch = {
		any: function() {
			return (
				typeof window.orientation !== "undefined" ||
				navigator.userAgent.indexOf("IEMobile") !== -1
			);
		}
	};
	if (isTouch.any()) $(".details").find("nav").css("display", "block");
}
isMobileDevice();
/*
//USING - vanilla function
function initCard(selector){
	var $card = $(selector);
	var $activeCard = $card.find(".imgBx");
	var $activeDetails = $card.find(".details");

	$activeDetails.on("touchstart", function(e){
		e.preventDefault();
		$(this).css("left", "100%");
		$activeCard.css("left", "0%");
	});

	$activeCard.on("touchstart", function(e){
		$(this).css("left", "-100%");
		$activeDetails.css("left", "0%");
		e.preventDefault();
	});
}

initCard(".c1x");
initCard(".c2x");
initCard(".c3x");

//CARD 2
$(".c2 .details").on("touchstart", function(e) {
	$(this).css("left","100%");
	$(".imgBx").css("left","0%");
	e.preventDefault();
});

$(".c2 .imgBx").on("touchstart", function(e) {
	$(this).css("left","-100%");
	$(".c2 .details").css("left","0%");
	e.preventDefault();
});

//CARD 3
$(".c3 .details").on("touchstart", function(e) {
	$(this).css("left","100%");
	$(".imgBx").css("left","0%");
	e.preventDefault();
});

$(".c3 .imgBx").on("touchstart", function(e) {
	$(this).css("left","-100%");
	$(".c3 .details").css("left","0%");
	e.preventDefault();
});
*/
//card height
function setCardHeight() {
	var cardwidth = $(".card").width();
	$(".card").css("height", cardwidth);
}
setCardHeight();
$(window).resize(function() {
	setCardHeight();
});
