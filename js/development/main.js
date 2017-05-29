/*
                              _       __  _     
   ____ ___  ____ ___________(_)___ _/ / (_)____
  / __ `__ \/ __ `/ ___/ ___/ / __ `/ / / / ___/
 / / / / / / /_/ / /  / /__/ / /_/ / / / (__  ) 
/_/ /_/ /_/\__,_/_/   \___/_/\__,_/_(_)_/____/  

Post-Page Load Javascript
Author: Michael Marcialis, michael@marcial.is
*/


/*********************************************************************************************************
**********************************************************************************************************
***
***  GET BROWSER SCROLLBAR WIDTH
***
**********************************************************************************************************
*********************************************************************************************************/


function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
 
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
 
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
 
    if (w1 === w2) {
        w2 = outer.clientWidth;
    }
 
    document.body.removeChild(outer);
 
    return (w1 - w2);
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  GET AND SET GLOBAL VARIABLES
***
**********************************************************************************************************
*********************************************************************************************************/


var scrollbarWidth = getScrollBarWidth(),
    currentViewportWidth = document.documentElement.clientWidth+scrollbarWidth,
    breakSmall = 503,  //Equals 31.4375em
    breakMedium = 686, //Equals 42.875em
    breakLarge = 1070,  //Equals 66.875em
    breakExtra = 1220; //Equals 76.25em




/*********************************************************************************************************
**********************************************************************************************************
***
***  SMOOTH ANCHOR LINK SCROLLING
***
**********************************************************************************************************
*********************************************************************************************************/


function smoothScroll(target, offset) {
    offset = offset || 0;
    $('html,body').animate({scrollTop: target.offset().top+offset}, 1000);
}


/*==========================================================================
  NAVIGATION ANCHOR
==========================================================================*/

function navAnchor() {
    $('.global-nav a, .work-nav a, .footer-nav a').on('click', function(event) {
        smoothScroll($($(this).attr('href')));
        event.preventDefault();
    });
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  INVIEW
***
**********************************************************************************************************
*********************************************************************************************************/


/*==========================================================================
  INVIEW PROJECT
==========================================================================*/


function bindInviewProject() {
    $('.project').bind('inview', function (event, visible, topOrBottomOrBoth) {
        var target = $('.work-nav a[href="#' + event.currentTarget.id + '"]').parent('li'),
            inviewClass = 'is-in-view';

        if (visible === true) {
            if (topOrBottomOrBoth === 'top') {
                target.addClass(inviewClass);
            }
        } else {
            target.removeClass(inviewClass);
        }
    });
}


/*==========================================================================
  INVIEW CONTACT
==========================================================================*/

function bindInviewContact() {
    $('#contact').one('inview', function (event, visible) {
        if (visible === true) {
            $('#' + event.currentTarget.id).addClass('is-in-view');
        }
    });
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  STICKY CONTENT
***
**********************************************************************************************************
*********************************************************************************************************/


function positionSticky() {
    $('.sticky-content').fixTo('.sticky-wrapper', {
        className: 'is-stuck',
        zIndex: 1000,
        useNativeSticky: false
    });
}

function positionStickyToggle() {
    if (currentViewportWidth < breakLarge) {
        $('.sticky-content').fixTo('stop');
    } else {
        $('.sticky-content').fixTo('start');
    }
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  MENU SHOW/HIDE CONTENT
***
**********************************************************************************************************
*********************************************************************************************************/


function bindMenu() {
    $('.menu .menu-toggle').on('click', function() {
        $(this).parent('.menu').toggleClass('is-active');
        return false;
    });
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  KEYBOARD ACCESSIBILITY
***
**********************************************************************************************************
*********************************************************************************************************/


function keyboardAccessibility() {
    var keyboardAccessbile = $('.keyboard-accessible'),
        code;

    if ( keyboardAccessbile.length ) {
        keyboardAccessbile.attr({
            role: 'button',
            tabindex: '0'
        });

        keyboardAccessbile.on('keydown', function(e) {
            code = e.which;
            if (code === 13) {
                $(this).click();
            }
        });
    }
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  CONTACT FORM
***
**********************************************************************************************************
*********************************************************************************************************/


function submitForm() {
    var form = $('#contactForm'),
        inputs = form.find('input, textarea'),
        successClass = 'type-success',
        errorClass = 'type-error',
        responseContainer,
        responseParagraph;

    $(form).submit(function(e) {
        e.preventDefault();

        var formData = $(form).serialize();

        if ( $('.contact-response').length === 0 ) {
            form.after('<div class="contact-response"><p>Please wait. Loading&hellip;</p></div>');
            responseContainer = $('.contact-response');
            responseParagraph = responseContainer.children('p');
        }

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            responseContainer.removeClass(errorClass).addClass(successClass);
            responseParagraph.text(response);
            inputs.val('');
        })
        .fail(function(data) {
            responseContainer.removeClass(successClass).addClass(errorClass);
            if (data.responseText !== '') {
                responseParagraph.text(data.responseText);
            } else {
                responseParagraph.text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  VIEWPORT RESIZE DETECTION
***
**********************************************************************************************************
*********************************************************************************************************/


/*==========================================================================
  FUNCTIONALITY TO RUN ON RESIZE
==========================================================================*/

function resizeEvent() {
    $(window).on("debouncedresize", function() {
        //Set current new viewport width on resize
        currentViewportWidth = document.documentElement.clientWidth+scrollbarWidth;

        //Check whether to enable or disable sticky
        positionStickyToggle();
    });
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  FUNCTIONS TO RUN ON DOCUMENT READY
***
**********************************************************************************************************
*********************************************************************************************************/


$(document).ready(function(){
    navAnchor();
    bindInviewProject();
    bindInviewContact();
    positionSticky();
    positionStickyToggle();
    bindMenu();
    submitForm();
    keyboardAccessibility();
    resizeEvent();
});