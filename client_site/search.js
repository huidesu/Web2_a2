// When the DOM (Document Object Model) of the document has been fully loaded, execute this anonymous function.
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('checkbox');
    // Get the element with the id "checkbox". This element will be used to hold radio boxes related to categories.

    // Use the fetch API to retrieve all category data from the specified URL.
    // The fetch function returns a Promise, which is used to handle asynchronous operations.
    fetch('http://localhost:3060/api/funding/GATEGORY/ALL')
   .then(response => response.json())
      // Convert the received response (response) into JSON - formatted data.
      // This operation is also asynchronous, so it returns a new Promise.
   .then(data => {
            // Iterate through each data item (category) retrieved from the server.
            data.forEach(item => {
                // If the data item exists and contains the 'NAME' property.
                if (item && item['NAME']) {
                    const checkbox = document.createElement('input');
                    // Create a new input element with the type 'radio' (radio box).
                    checkbox.type = 'radio';
                    checkbox.value = item['NAME'];

                    checkbox.id = 'checkbox_' + item['NAME'];

                    checkbox.name = 'only';

                    const label = document.createElement('label');

                    label.textContent = item['NAME'];
                    label.htmlFor = 'checkbox_' + item['NAME'];

                    container.appendChild(checkbox);
 
                    container.appendChild(label);

                    container.appendChild(document.createElement('br'));

                } else {
                    console.log('The data item is missing the name property or the name property is empty:', item);
                    // If the data item is missing the 'NAME' property or the 'NAME' property is empty, print relevant information to the console.
                }
            });
        })
   .catch(error => console.error('Error:', error));
     // If an error occurs during the fetch process, catch the error and print the error message to the console.
});

function startSearch() {
    const organizer = document.getElementById('organizer').value;
    // Get the value in the input box with the id "organizer", which is the name of the organizer.
    const city = document.getElementById('city').value;

    let category = document.querySelector('input[name = "only"]:checked')?.value;
    // Use the query selector to get the value of the checked (name is 'only') radio box. If none is checked, it will be undefined.
    if (category === undefined) {
        category = '';
        // If no category radio box is checked, set the category to an empty string.
    }
    let url = `http://localhost:3060/api/funding/SEARCH/one?organizer=${organizer}&city=${city}&category=${category}`;
    // Build a URL for searching according to the organizer, city, and category information entered by the user.

    if (organizer || city || category) {
        // If at least one of the organizer, city, or category has a value (not an empty string).
        fetch(url)
       .then(response => response.json())
          // Use the fetch API to get the search results according to the built URL and convert the response into JSON - formatted data.
       .then(data => {
                const MyDiv = document.getElementById('records');
                MyDiv.innerHTML = "";
                // First, clear the content in the element with the id "records" to display new search results.
                console.log(data);
                if (data.length > 0) {
                    const MyDiv = document.getElementById('records');
                    MyDiv.innerHTML = '';
                    // Clear the "records" element content again (maybe to ensure that previous residual content is completely removed).
                    data.forEach(fundraiser => {
                        const item = document.createElement('li');
                        // For each searched fundraiser, create a new <li> element.
                        const idP = document.createElement('p');
                        idP.textContent = `ID: ${fundraiser.FUNDRAISER_ID}`;

                        const organizerP = document.createElement('p');
                        organizerP.textContent = `Organizer: ${fundraiser.ORGANIZER}`;

                        const captionP = document.createElement('p');
                        captionP.textContent = `Caption: ${fundraiser.CAPTION}`;

                        const targetFundingP = document.createElement('p');
                        targetFundingP.textContent = `Target Funding: ${fundraiser.TARGET_FUNDING} AUD`;

                        const currentFundingP = document.createElement('p');
                        currentFundingP.textContent = `Current Funding: ${fundraiser.CURRENT_FUNDING} AUD`;

                        const cityP = document.createElement('p');
                        cityP.textContent = `City: ${fundraiser.CITY}`;

                        const categoryP = document.createElement('p');
                        categoryP.textContent = `Category: ${fundraiser.CategoryName}`;

                        const statusP = document.createElement('p');
                        statusP.textContent = `Status: ${fundraiser.ACTIVE? 'Active' : 'Inactive'};`

                        item.appendChild(idP);
                        item.appendChild(organizerP);
                        item.appendChild(captionP);
                        item.appendChild(targetFundingP);
                        item.appendChild(currentFundingP);
                        item.appendChild(cityP);
                        item.appendChild(categoryP);
                        item.appendChild(statusP);
                        // Add each <p> element containing fundraiser information to the corresponding <li> element.

                        item.addEventListener("click", function () {
                            localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                            location.href = '/fundraiser';
                        });
                        // Add a click event listener to each fundraiser information block (<li> element).
                        // When clicked, store the fundraiser's ID in local storage (localStorage) and redirect the page to the '/fundraiser' path.

                        MyDiv.appendChild(item);
                        // Add the <li> element containing the complete fundraiser information to the "records" element to display the search results.
                    });
                } else {
                    const errorP = document.createElement('p');
                    errorP.textContent = 'No relevant fundraisers found';
                    errorP.style.color ='red';
                    errorP.style.fontWeight = 'bold';
                    MyDiv.appendChild(errorP);
                    // If no relevant fundraisers are found, create a <p> element to display the corresponding prompt message, set the color to red and the font weight to bold, and then add it to the "records" element.
                }
            })
       .catch(error => {
                console.error("Error here", error);
                if (error.status === 404) {
                    document.getElementById('records').textContent = "No relevant data found, please check the search conditions";
                    // If the search result returns a 404 status code (no relevant data found), display the corresponding prompt message in the "records" element, prompting the user to check the search conditions.
                } else if (error.status === 500) {
                    document.getElementById('records').textContent = "Internal server error, please try again later";
                    // If the search result returns a 500 status code (internal server error), display the corresponding prompt message in the "records" element, prompting the user to try again later.
                } else {
                    document.getElementById('records').textContent = "Load failed";
                    // If it is other errors, display the "Load failed" prompt message in the "records" element.
                }
            });
    } else {
        alert('At least one search condition needs to be provided!');
        const MyDiv = document.getElementById('records');
        MyDiv.textContent = "";
        // If none of the organizer, city, and category has any input value, pop up an alert box to prompt the user to provide at least one search condition, and clear the content in the "records" element.
    }
}

function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name = "only"]');
    // Get all radio box elements with the name 'only'.
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        // Set the checked state of each radio box to false.
    });
    document.getElementById('organizer').value = '';
    // Clear the value in the organizer input box.
    document.getElementById('city').value = '';

}
