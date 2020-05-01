/* =================================
------------------------------------
	Template Name: Industry.INC 
	Description: Industry.INC HTML Template
	Author: Thinkitive
	Author URI: https://www.Thinkitive.com/
	Version: 1.0
	Created: Thinkitive
 ------------------------------------
 ====================================*/


'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.site-nav-menu > ul').slicknav({
		appendTo:'.header-section',
		closedSymbol: '<i class="fa fa-angle-down"></i>',
		openedSymbol: '<i class="fa fa-angle-up"></i>',
		allowParentLinks: true
	});

	$('.slicknav_nav').append('<li class="search-switch-warp"></li>');


	/*------------------
		Search model
	--------------------*/
	$('.search-switch').on('click', function() {
		$('.search-model').fadeIn(400);
	});

	$('.search-close-switch').on('click', function() {
		$('.search-model').fadeOut(400,function(){
			$('#search-input').val('');
		});
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Hero Slider
	--------------------*/
	$('.hero-slider').owlCarousel({
		nav: true,
		dots: false,
		loop: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		autoplay: true,
		items: 1,
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
	});

	/*------------------
		Brands Slider
	--------------------*/
	$('#client-carousel').owlCarousel({
		nav: false,
		loop: true,
		margin:20,
		autoplay: true,
		responsive:{
			0:{
				items:2,
				margin: 0
			},
			600:{
				items:3
			},
			800:{
				items:4
			},
			992:{
				items:4
			},
			1200:{
				items:5
			},
		}
	});

	/*---------------------
		Testimonial Slider
	----------------------*/
	$('.testimonial-slider').owlCarousel({
		nav: false,
		dots: true,
		loop: true,
		autoplay: true,
		items: 1,
	});

	/*------------------
		Image Popup
	--------------------*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});
	
	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});

	/*------------------
		Progress Bar
	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});

	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cpid 	= $(this).data("cpid");

		$(this).prepend('<div class="'+ cpid +' circle-warp"><h2>'+ cpvalue +'%</h2></div>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 112,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 112,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});

})(jQuery);


(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;
    var defaults = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: 'is-sticky',
        wrapperClassName: 'sticky-wrapper',
        center: false,
        getWidthFrom: '',
        widthFromWrapper: true,
        responsiveWidth: false,
        zIndex: 'inherit'
    }
      , $window = $(window)
      , $document = $(document)
      , sticked = []
      , windowHeight = $window.height()
      , scroller = function() {
        var scrollTop = $window.scrollTop()
          , documentHeight = $document.height()
          , dwh = documentHeight - windowHeight
          , extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
        for (var i = 0, l = sticked.length; i < l; i++) {
            var s = sticked[i]
              , elementTop = s.stickyWrapper.offset().top
              , etse = elementTop - s.topSpacing - extra;
            s.stickyWrapper.css('height', s.stickyElement.outerHeight());
            if (scrollTop <= etse) {
                if (s.currentTop !== null) {
                    s.stickyElement.css({
                        'width': '',
                        'position': '',
                        'top': '',
                        'z-index': ''
                    });
                    s.stickyElement.parent().removeClass(s.className);
                    s.stickyElement.trigger('sticky-end', [s]);
                    s.currentTop = null;
                }
            } else {
                var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                if (newTop < 0) {
                    newTop = newTop + s.topSpacing;
                } else {
                    newTop = s.topSpacing;
                }
                if (s.currentTop !== newTop) {
                    var newWidth;
                    if (s.getWidthFrom) {
                        padding = s.stickyElement.innerWidth() - s.stickyElement.width();
                        newWidth = $(s.getWidthFrom).width() - padding || null;
                    } else if (s.widthFromWrapper) {
                        newWidth = s.stickyWrapper.width();
                    }
                    if (newWidth == null) {
                        newWidth = s.stickyElement.width();
                    }
                    s.stickyElement.css('width', newWidth).css('position', 'fixed').css('top', newTop).css('z-index', s.zIndex);
                    s.stickyElement.parent().addClass(s.className);
                    if (s.currentTop === null) {
                        s.stickyElement.trigger('sticky-start', [s]);
                    } else {
                        s.stickyElement.trigger('sticky-update', [s]);
                    }
                    if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
                        s.stickyElement.trigger('sticky-bottom-reached', [s]);
                    } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
                        s.stickyElement.trigger('sticky-bottom-unreached', [s]);
                    }
                    s.currentTop = newTop;
                }
                var stickyWrapperContainer = s.stickyWrapper.parent();
                var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);
                if (unstick) {
                    s.stickyElement.css('position', 'absolute').css('top', '').css('bottom', 0).css('z-index', '');
                } else {
                    s.stickyElement.css('position', 'fixed').css('top', newTop).css('bottom', '').css('z-index', s.zIndex);
                }
            }
        }
    }
      , resizer = function() {
        windowHeight = $window.height();
        for (var i = 0, l = sticked.length; i < l; i++) {
            var s = sticked[i];
            var newWidth = null;
            if (s.getWidthFrom) {
                if (s.responsiveWidth) {
                    newWidth = $(s.getWidthFrom).width();
                }
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth != null) {
                s.stickyElement.css('width', newWidth);
            }
        }
    }
      , methods = {
        init: function(options) {
            return this.each(function() {
                var o = $.extend({}, defaults, options);
                var stickyElement = $(this);
                var stickyId = stickyElement.attr('id');
                var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
                var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);
                stickyElement.wrapAll(function() {
                    if ($(this).parent("#" + wrapperId).length == 0) {
                        return wrapper;
                    }
                });
                var stickyWrapper = stickyElement.parent();
                if (o.center) {
                    stickyWrapper.css({
                        width: stickyElement.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    });
                }
                if (stickyElement.css("float") === "right") {
                    stickyElement.css({
                        "float": "none"
                    }).parent().css({
                        "float": "right"
                    });
                }
                o.stickyElement = stickyElement;
                o.stickyWrapper = stickyWrapper;
                o.currentTop = null;
                sticked.push(o);
                methods.setWrapperHeight(this);
                methods.setupChangeListeners(this);
            });
        },
        setWrapperHeight: function(stickyElement) {
            var element = $(stickyElement);
            var stickyWrapper = element.parent();
            if (stickyWrapper) {
                stickyWrapper.css('height', element.outerHeight());
            }
        },
        setupChangeListeners: function(stickyElement) {
            if (window.MutationObserver) {
                var mutationObserver = new window.MutationObserver(function(mutations) {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                        methods.setWrapperHeight(stickyElement);
                    }
                }
                );
                mutationObserver.observe(stickyElement, {
                    subtree: true,
                    childList: true
                });
            } else {
                if (window.addEventListener) {
                    stickyElement.addEventListener('DOMNodeInserted', function() {
                        methods.setWrapperHeight(stickyElement);
                    }, false);
                    stickyElement.addEventListener('DOMNodeRemoved', function() {
                        methods.setWrapperHeight(stickyElement);
                    }, false);
                } else if (window.attachEvent) {
                    stickyElement.attachEvent('onDOMNodeInserted', function() {
                        methods.setWrapperHeight(stickyElement);
                    });
                    stickyElement.attachEvent('onDOMNodeRemoved', function() {
                        methods.setWrapperHeight(stickyElement);
                    });
                }
            }
        },
        update: scroller,
        unstick: function(options) {
            return this.each(function() {
                var that = this;
                var unstickyElement = $(that);
                var removeIdx = -1;
                var i = sticked.length;
                while (i-- > 0) {
                    if (sticked[i].stickyElement.get(0) === that) {
                        splice.call(sticked, i, 1);
                        removeIdx = i;
                    }
                }
                if (removeIdx !== -1) {
                    unstickyElement.unwrap();
                    unstickyElement.css({
                        'width': '',
                        'position': '',
                        'top': '',
                        'float': '',
                        'z-index': ''
                    });
                }
            });
        }
    };
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }
    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    }
    ;
    $.fn.unstick = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.unstick.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    }
    ;
    $(function() {
        setTimeout(scroller, 0);
    });
}));
