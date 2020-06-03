// variables
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let currentSentence = sentences[0];
let totalSentences = 0;
let letterIndex = 0;
let mistakeCount = 0;

// Functions

// adds span with green checkmark to #feedback
function correctLetter() {

    let $addSpan = $('<span>').attr('class', 'glyphicon glyphicon-ok')
    $('#feedback').append($addSpan)
};

// increases mistakes and adds span with red X to #feedback
function inCorrectLetter() {

    mistakeCount++
    let $addSpan = $('<span>').attr('class', 'glyphicon glyphicon-remove')
    $('#feedback').append($addSpan)
}

// set yellow block back to initial state
function resetYellowBlock() {
    $('#yellow-block').animate({ left: `15px` }, { duration: 125, easing: `linear` });
}

// set target letter
function targetLetter() {
    $('#target-letter').text(currentSentence[letterIndex])
}
// sets div with id sentence text to current sentence
$('#sentence').text(currentSentence)

//Sets starting target letter
targetLetter();

// Hides Upper Keyboard Container
$('#keyboard-upper-container').hide();

// Function that looks for the document to hold the shift key (value 16) down and changes the visibility of the keyboard
// When the key is released it toggle the visibility back to normal
$(document).keydown(function (e) {
    if (e.which === 16) {
        // Had to use show or hide here instead of toggle cause it was constantly toggling the keyboards while the shift key was held down
        $('#keyboard-upper-container').show()
        $('#keyboard-lower-container').hide()
    }
})
    .keyup(function (e) {
        if (e.which === 16) {
            $('#keyboard-upper-container, #keyboard-lower-container').toggle()
        }
        $('.highlight').toggleClass("highlight")

    })

// uses jquery ui to highlight keys when pressed
$(document).keypress(function (e) {

    let keyID = '#' + e.which;

    $(keyID).toggleClass("highlight")

    // Pulls charCode for current letter in sentences
    let asciiCurrentLetter = currentSentence.charCodeAt(letterIndex)

    // moves yellow block right on keypress
    $('#yellow-block').animate({ left: '+=17.5px' }, { duration: 125, easing: 'linear' });

    // if statement comparing totalSentences to sentence length.  This allows us to control what happens when we hit the last sentence
    if (totalSentences < sentences.length - 1) {
        // if statement comparing letterIndex to current sentence length.  This allows us to control what happens when we hit the last letter of a sentence
        if (letterIndex < currentSentence.length - 1) {
            // checks to see if ID of key pressed = ascii of current letter  
            if (e.which === asciiCurrentLetter) {
                // if = calls correct letter
                correctLetter()

            } else {
                // if not calls inCorrectLetter
                inCorrectLetter()
            }
            letterIndex++
        } else {
            // if last letter of sentence checks if the letter is correct
            if (e.which === asciiCurrentLetter) {
                correctLetter()
            } else {
                inCorrectLetter()
            }

            // removes items with class glyphicon
            $('.glyphicon').remove()

            // reset letterIndex
            letterIndex = 0

            // increases totalSentence by 1
            totalSentences++

            // resets div with ID yellow-block
            resetYellowBlock();
            
            // sets currentSentence
            currentSentence = sentences[totalSentences]
            $('#sentence').text(currentSentence)



        }
    } else {
        // if statement comparing letterIndex to current sentence length.  This allows us to control what happens when we hit the last letter of a sentence
        if (letterIndex < currentSentence.length - 1) {
            // checks to see if ID of key pressed = ascii of current letter  
            if (e.which === asciiCurrentLetter) {
                // if equal calls correctLetter
                correctLetter();

            } else {
                // if not calls inCorrectLetter
                inCorrectLetter();
            };
            letterIndex++;
        } else {
            // if last letter of sentence checks if the letter is correct
            if (e.which === asciiCurrentLetter) {
                correctLetter();
            } else {
                inCorrectLetter();
            };

            // removes items with class glyphicon
            $('.glyphicon').remove();

            // reset letterIndex
            letterIndex = 0
            // increases totalSentence by 1
            totalSentences++

            // resets div with ID yellow-block
            resetYellowBlock();

        }
    }

    targetLetter()
});
