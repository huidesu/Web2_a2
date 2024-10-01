// When the DOM (Document Object Model) of the document has been fully loaded, execute this anonymous function.
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the value of the item named 'ID' from local storage (localStorage). This value may be the ID of a fundraiser.
    const fundraiserId = localStorage.getItem('ID');
    // Use the fetch API to retrieve data for a specific fundraiser from the specified URL.
    // The fetch function returns a Promise, which is used to handle asynchronous operations.
    fetch('http://localhost:3060/api/funding/' + fundraiserId)
  .then(response => response.json())
      // Convert the received response (response) into JSON - formatted data.
      // This operation is also asynchronous, so it returns a new Promise.
  .then(data => {
                // Retrieve an element in the HTML page by its ID. This element may be used to display the detailed information of a specific fundraiser.
                const fundraisersList = document.getElementById('fundraiserDetails');
                // Before adding new fundraiser information, clear the existing data (innerHTML) within this element.
                fundraisersList.innerHTML = '';

                // Iterate through each fundraiser (fundraiser) data object retrieved from the server.
                data.forEach(fundraiser => {
                    // Create a new <li> element to represent each fundraiser's information block.
                    const item = document.createElement('li');
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
                    statusP.textContent = `Status: ${fundraiser.ACTIVE? 'Active' : 'Inactive'}`;

                    // Add each <p> element containing fundraiser information to the corresponding <li> element.
                    item.appendChild(idP);
                    item.appendChild(organizerP);
                    item.appendChild(captionP);
                    item.appendChild(targetFundingP);
                    item.appendChild(currentFundingP);
                    item.appendChild(cityP);
                    item.appendChild(categoryP);
                    item.appendChild(statusP);

                    // Add the <li> element containing the complete fundraiser information to the fundraiser list (fundraisersList) element.
                    fundraisersList.appendChild(item);
                });
            })
  .catch(error => console.error('Error fetching fundraisers:', error));
     // If an error occurs during the fetch process, catch the error and print the error message to the console.
});

function handleDonateClick() {
    // When this function is called, display an alert box indicating that this feature is under construction.
    alert('This feature is under construction.');
}

// Add a click event listener to the button element with the ID 'donateButton'.
// When the button is clicked, call the handleDonateClick function.
document.getElementById('donateButton').addEventListener('click', handleDonateClick);
