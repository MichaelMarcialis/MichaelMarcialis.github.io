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
***  PHONE BOOK VIA LOCALSTORAGE
***
**********************************************************************************************************
*********************************************************************************************************/


/*==========================================================================
  OUTPUT EMPTY ALERT
==========================================================================*/

function outputAlert(target) {
    target.prepend('<div class="alert"><p>There is currently nobody in your phone book. Please use the manage contacts form to insert new contacts into your phone book.</p></div>');
}


/*==========================================================================
  OUTPUT LOCALSTORAGE ENTRIES
==========================================================================*/

function outputEntries(target) {
    var finalOutput = [],
        i;

    //Clear placeholder
    target.empty();

    //Store objects in array
    for (i = 0; i < localStorage.length; i++) {
        finalOutput[i] = JSON.parse(localStorage.getItem(localStorage.key(i))) || null;
    }

    //Sort array by alpha
    finalOutput.sort(function (a, b) {
        var tempA = a.contactLastName.toLowerCase(),
            tempB = b.contactLastName.toLowerCase();

        if ( tempA > tempB ) {
            return 1;
        } else if ( tempA < tempB ) {
            return -1;
        } else {
            return 0;
        }
    });

    //Output markup from array
    for (i = 0; i < finalOutput.length; i++) {
        target.append('<article id="entry' + i + '" class="entry"><h2>' + finalOutput[i].contactFirstName + ' ' + finalOutput[i].contactLastName + '</h2><p>' + finalOutput[i].contactPhone + '</p><button class="button-delete" type="button"><span class="is-hidden-accessible">Delete</span></button></article>');
    }
    
    //Click event on delete button
    $('.button-delete').on('click', function(e) {
        e.preventDefault();

        localStorage.removeItem($(this).parent('article').attr('id'));
        $(this).parent('article').remove();

        if (localStorage.length === 0) {
            outputAlert(target);
        }
    });
}


/*==========================================================================
  BUILD CORE PHONE BOOK FUNCTIONALITY
==========================================================================*/

function buildPhoneBook() {
    //Check if localStorage is available
    if (localStorage) {
        var form = $('#contactForm'),
            inputs = form.find('input'),
            inputValue = {},
            increment = 0,
            container = $('.contact-view'),
            i;

        //If localStorage already has data, output it; otherwise, output alert
        if (localStorage.length) {
            outputEntries(container);
        } else {
            outputAlert(container);
        }

        //Clear button click event
        $('#buttonClear').on('click', function() {
            localStorage.clear();
            container.empty();
            increment = 0;
            outputAlert(container);
        });

        //Form is submitted
        $(form).submit(function(e) {
            e.preventDefault();

            //Add input keys and values to object
            for (i = 0; i < inputs.length; i++) {
                inputValue[$(inputs[i]).attr('id')] = $(inputs[i]).val();
            }

            //Clear form fields
            inputs.val('');

            //Find last key number for continuity
            if ( localStorage.key(localStorage.length - 1) !== null ) {
                increment = parseInt(localStorage.key(localStorage.length - 1).replace('entry', '')) + 1;
            }

            //Stringify oject
            localStorage.setItem('entry' + increment, JSON.stringify(inputValue));

            //Output data to screen
            outputEntries(container);
        });
    }
}




/*********************************************************************************************************
**********************************************************************************************************
***
***  FUNCTIONS TO RUN ON DOCUMENT READY
***
**********************************************************************************************************
*********************************************************************************************************/


$(document).ready(function(){
    buildPhoneBook();
});