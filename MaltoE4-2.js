const fullTextContent = document.getElementById('fullText');
const searchBoxContent = document.getElementById('strSearch');
const replaceBoxContent = document.getElementById('strReplace');

// Search text, display position, tell user whether text is found or not. 
function searchText() {

    // SEARCH text and display its position. Opted to use lowercase-converted strings to ignore case-sensitivity.

    let fullTextLower = fullTextContent.value.toLowerCase();
    let searchBoxLower = searchBoxContent.value.toLowerCase();

    if (fullTextContent.value == "" || searchBoxContent.value == "") {
        updateNotification("Please fill in the main text and the 'find' input fields.", 2);
        return;
    }

    // Also, DISPLAY message whether text is found or not.

    if (!fullTextLower.includes(searchBoxLower)) {
        updateNotification("The text you were searching for was not found. Please input different text to look for.", 3); // Message for a string not found in text.
        document.getElementById('charPosition').innerHTML = "N/A"; // Reflect in DOM.
        return false;
    }

    // IF FOUND: display position of the substring.
    else {
        let position = fullTextLower.search(searchBoxLower); // Claim the index position of the target word in the paragraph.
        updateNotification(`Text found at position ${position}!`, 1); // Message for a string found in text.
        document.getElementById('charPosition').innerHTML = position; // Reflect in DOM.
        return true; // for the purpose of the function call from replaceText().
    }
}

// Replace text.
function replaceText() {

    // CHECK if the Search field is filled. For the argument of checking if the Replace field is filled, 
    // I opted to ignore blank inputs so that the user can choose to omit particular words in their paragraph.

    if (searchBoxContent.value != "") {

        let inText = searchText(); // if filled, check if content in search box is in the main text. 

        // I opted to make a function call to searchText() to take advantage of the feedback messages there.

        if (inText) {
            let regexSetup = new RegExp(searchBoxContent.value, 'gi'); // Set up RegEx (case-insensitive and global)
            let finalText = fullTextContent.value.replace(regexSetup, replaceBoxContent.value); // Replace text.
            document.getElementById('fullText').value = finalText; // Make reflection in the DOM.
            updateNotification("Text replaced successfully!", 1); // Send over a feedback message.
        }
    }

    else {
        updateNotification("Please fill up the Search input field.", 2);
    }
}

// Change cases: uppercase and lowercase (Apply to all text).
function changeCase(casedef) {

    if (fullTextContent.value != "" || searchBoxContent.value != "" || replaceBoxContent.value != "") {
        if (casedef === 'upper') {
            document.getElementById('fullText').value = fullTextContent.value.toUpperCase();
            document.getElementById('strSearch').value = searchBoxContent.value.toUpperCase();
            document.getElementById('strReplace').value = replaceBoxContent.value.toUpperCase();
            updateNotification("All text converted to uppercase!", 1);
        }

        else if (casedef === 'lower') {
            document.getElementById('fullText').value = fullTextContent.value.toLowerCase();
            document.getElementById('strSearch').value = searchBoxContent.value.toLowerCase();
            document.getElementById('strReplace').value = replaceBoxContent.value.toLowerCase();
            updateNotification("All text converted to lowercase!", 1);
        }
    }

    else
        updateNotification("No text detected for case-changing. Please fill in any of the input fields.", 2)
}

// Clear input fields of their content.
function clearFields(fieldTarg) {

    searchBoxContent.value = "";
    replaceBoxContent.value = "";
    document.getElementById('charPosition').innerHTML = "-";

    if (fieldTarg == 2) {
        fullTextContent.value = "";
        updateNotification("All fields cleared!", 1);
    }
    else {
        updateNotification("Search & Replace fields cleared!", 1);
    }
}

function charCount() {
    // Including the researched function 'setInterval()' for automatic updating of character count every time the user types.
    setInterval(() => {
        let regexCharCount = new RegExp(" ", 'gi');
        let fullTextChars = fullTextContent.value.replace(regexCharCount, "");
        document.getElementById('charCount').innerHTML = fullTextChars.length;
    }, 50);
}


// Including the researched function 'forEach()' to capture all instances of an element (usually buttons) for readability
// and to ensure I don't miss anything compared to making multiple 'document.querySelector()' calls.

// All linear-gradients were created via: https://cssgradient.io/ 

function dayTheme() {
    document.querySelector('body').style.background = "linear-gradient(180deg, rgba(195,220,238,1) 12%, rgba(255,255,255,1) 28%, rgba(255,255,199,1) 42%, rgba(253,255,181,1) 62%, rgba(81,103,130,1) 82%)";
    document.querySelector('#editor').style.backgroundColor = "#165470";
    document.querySelectorAll('button').forEach(btn => { btn.style.backgroundColor = "#6399b6"; });
}

function afternoonTheme() {
    document.querySelector('body').style.background = "linear-gradient(180deg, rgba(196,124,31,1) 13%, rgba(242,154,46,1) 25%, rgba(231,90,10,1) 47%, rgba(165,61,8,1) 75%)";
    document.querySelector('#editor').style.backgroundColor = "#5c4034";
    document.querySelectorAll('button').forEach(btn => { btn.style.backgroundColor = "#ab8b7a"; });
}

function nightTheme() {
    document.querySelector('body').style.background = "linear-gradient(180deg,rgba(126,57,124,1) 20%, rgba(136,72,180,1) 41%, rgba(156,145,205,1) 69%, rgba(215,121,139,1) 80%)";
    document.querySelector('#editor').style.backgroundColor = "#3d1c51";
    document.querySelectorAll('button').forEach(btn => { btn.style.backgroundColor = "#8848b4"; });
}

function updateNotification(message, flag) {
    document.querySelectorAll('#notification').forEach(p => { p.textContent = message });

    // success
    if (flag == 1)
        document.querySelectorAll('#notification').forEach(p => { p.style.backgroundColor = "#a8dcab"; p.style.color = "green"; });

    // warning
    else if (flag == 2)
        document.querySelectorAll('#notification').forEach(p => { p.style.backgroundColor = "#ffffc5"; p.style.color = "rgb(137 104 6)"; });

    //error 
    else if (flag == 3)
        document.querySelectorAll('#notification').forEach(p => { p.style.backgroundColor = "#ff7f7f"; p.style.color = "#950606" });
}