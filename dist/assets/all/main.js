$(document).ready(function() {

	// main page carousel
	$('.js-main-carousel').owlCarousel({
		items:4,
		loop:true,
		margin:10,
		nav:true,
		dots: false,
		navText: [,],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});


	// discussion list function
	discussListGen();

	// blog comments list function
	blogCommentsListGen();

	// blog article function
	blogControlListGen();

	// header user dropdown 
	$('.js-user-dropdown').click(function() {
		$(this).toggleClass('active');
		return false;
	});

	// user page slide block
	$('.js-userPageSlide').click(function(){
		$(this).toggleClass('active').next().slideToggle();
		return false;
	});

	// shops list dropdown
	$('.js-shopsListBtn').click(function(){
		$(this).toggleClass('active');
		$('.js-shopsListDropdown').slideToggle();
		return false;
	});

	// blog comments scroll
	$(".js-comment-editor").click(function() {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1500);
    });

    // blog functional unauth control
    $('.js-blogFunctional-unauth').click(function() {
    	$('.popup-blog-functional-unauth').bPopup({
    		 autoClose: 10000
    	});
    	return false;
    });

    // $('.lia-button-Submit-action').click(function() {
    // 	window.onbeforeunload = null;
    // });

    // search popups
    $('.js-search-popups').click(function(){
    	var popupClass = $(this).data('search-popup');
    	$(popupClass).bPopup({
    		onOpen: function() {$('body').addClass('ov-hidden');}, 
            onClose: function() {$('body').removeClass('ov-hidden');}
    	});
    	return false;
    });

    var blogResLength = $('.popup-search-blog > ul > li').length;
    if(blogResLength < 9) {
    	switch(blogResLength) {
    		case 1:
    			$('.popup-search-blog').addClass('width-one-single');
    			break;
    		case 2:
    			$('.popup-search-blog').addClass('width-two-single');
    			break;
    		case 3:
    			$('.popup-search-blog').addClass('width-three-single');
    			break;
    		case 4:
    			$('.popup-search-blog').addClass('width-four-single');
    			break;
    		case 5:
    		case 6:
    			$('.popup-search-blog').addClass('width-three');
    			break;
    		case 7:
    		case 8:
    			$('.popup-search-blog').addClass('width-four');
    			break;
    	}
    }

    // coockie agree
    var cookieMain = $.cookie("agree");
    function track_user() {
    	setInterval(function() {
    		$.cookie('agree', 1, { expires: 1/24/60/30, path: '/' });
    	}, 1000);
    }
    if(cookieMain==null) {
    	var date = new Date();
    	setTimeout(function() {
    		$('.wr-coockie-agree').addClass('active');
    	}, 2000);
    	$('.js-coockie-agree').click(function() {
    		$('.wr-coockie-agree').removeClass('active');
    		track_user();
    		return false;
    	});
    } else {
    	track_user();
    }
    



});

$(window).load(function() {
	$('.preloader').fadeOut('slow');
});

// discussion list generation
function discussListGen() {
	// js-forum-list
	var forumDiscComp = $('.linear-message-list'),
		forumDiscGen = $('.js-forum-disc ul'),
		forumDiscCompLength = $('.linear-message-list .lia-linear-display-message-view').length,
		forumDiscCompRow = $('.linear-message-list .lia-linear-display-message-view');

	for(i=0;i<forumDiscCompLength;i++) {
		var forumDiscDeleteLink = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('href'),
			forumDiscDeleteData = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').data('lia-action-token'),
			forumDiscDeleteId = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('id'),
			forumDiscDeleteClasses = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('class'),
			forumDiscEditLink = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('href'),
			forumDiscEditId = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('id'),
			forumDiscEditClasses = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('class'),
			deleteButton = forumDiscCompRow.eq(i).find('.forum-disc .disc-red li:last-child a'),
			editButton = forumDiscCompRow.eq(i).find('.forum-disc .disc-red li:first-child a');

		if(forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').html() == undefined) {
			forumDiscDeleteLink = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('href');
			forumDiscDeleteData = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').data('lia-action-token');
			forumDiscDeleteId = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('id');
			forumDiscDeleteClasses = forumDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('class');
		}

		deleteButton.addClass(forumDiscDeleteClasses);
		deleteButton.attr('id', forumDiscDeleteId).attr('data-lia-action-token', forumDiscDeleteData).attr('href', forumDiscDeleteLink);
		editButton.addClass(forumDiscEditClasses);
		editButton.attr('id', forumDiscEditId).attr('href', forumDiscEditLink);
	}
}

function blogCommentsListGen() {
	// js-forum-list
	var blogDiscComp = $('.linear-message-list'),
		blogDiscGen = $('.js-forum-disc ul'),
		blogDiscCompLength = $('.lia-component-comment-list .lia-panel-message').length,
		blogDiscCompRow = $('.lia-component-comment-list .lia-panel-message');

	for(i=0;i<blogDiscCompLength;i++) {
		var blogDiscDeleteLink = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('href'),
			blogDiscDeleteData = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').data('lia-action-token'),
			blogDiscDeleteId = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('id'),
			blogDiscDeleteClasses = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').attr('class'),
			blogDiscEditLink = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('href'),
			blogDiscEditId = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('id'),
			blogDiscEditClasses = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .edit-message').attr('class'),
			deleteButton = blogDiscCompRow.eq(i).find('.forum-disc .disc-red li:last-child a'),
			editButton = blogDiscCompRow.eq(i).find('.forum-disc .disc-red li:first-child a');

		if(blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message').html() == undefined) {
			blogDiscDeleteLink = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('href');
			blogDiscDeleteData = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').data('lia-action-token');
			blogDiscDeleteId = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('id');
			blogDiscDeleteClasses = blogDiscCompRow.eq(i).find('.lia-menu-navigation .dropdown-positioning .lia-menu-dropdown-items .delete-message-and-replies').attr('class');
		}

		deleteButton.addClass(blogDiscDeleteClasses);
		deleteButton.attr('id', blogDiscDeleteId).attr('data-lia-action-token', blogDiscDeleteData).attr('href', blogDiscDeleteLink);
		editButton.addClass(blogDiscEditClasses);
		editButton.attr('id', blogDiscEditId).attr('href', blogDiscEditLink);
	}
}

function blogControlListGen() {

	var blogDiscGen = $('.blogControl'),
		blogDiscCompRow = $('.MessageView > .lia-quilt-blog-topic-message > .lia-quilt-row-header .lia-menu-dropdown-items');

	var blogDiscDeleteLink = blogDiscCompRow.find('.delete-thread').attr('href'),
	blogDiscDeleteData = blogDiscCompRow.find('.delete-thread').data('lia-action-token'),
	blogDiscDeleteId = blogDiscCompRow.find('.delete-thread').attr('id'),
	blogDiscDeleteClasses = blogDiscCompRow.find('.delete-thread').attr('class'),
	blogDiscEditLink = blogDiscCompRow.find('.edit-message').attr('href'),
	blogDiscEditId = blogDiscCompRow.find('.edit-message').attr('id'),
	blogDiscEditClasses = blogDiscCompRow.find('.edit-message').attr('class'),
	deleteButton = $('.blogControl a.blogDel'),
	editButton = $('.blogControl a.blogEdit');

	deleteButton.addClass(blogDiscDeleteClasses);
	deleteButton.attr('id', blogDiscDeleteId).attr('data-lia-action-token', blogDiscDeleteData).attr('href', blogDiscDeleteLink);
	editButton.addClass(blogDiscEditClasses);
	editButton.attr('id', blogDiscEditId).attr('href', blogDiscEditLink);
}

// delete message button
// function deleteMessageButtons() {
// 	var messageList = $('.lia-component-reply-list > div'),
// 		messageListLength = $('.lia-component-reply-list > div .lia-linear-display-message-view').length;

// 	for(i=0;i<messageListLength;i++) {
// 		var 
// 	}
// }