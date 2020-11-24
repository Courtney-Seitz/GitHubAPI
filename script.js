function getUserRepos(userName) {
    const searchURL = `https://api.github.com/users/${userName}/repos`;
    fetch(searchURL)
    .then(response => {
        if (response.ok) {
        return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $("#js-error-message").text(`Something went wrong: ${error.message}`);
    });
    console.log("getUserRepos() ran");
    console.log("displayResults() called.");
    displayResults();
}

function displayResults(responseJson) {
    $("#results-list").empty();
    for (let i = 0; i < responseJson.length; i++) {
        $(`#results-list`).append(`<li><a href="${responseJson[i].html_url}" target="_blank"><h3>
        ${responseJson[i].name}</h3></a></li><p>${responseJson[i].description}</p>`);
    }

    $(`#results`).removeClass("hidden");
    console.log("displayResults()ran.");
}

function watchForm() {
    console.log("App ready for submission");
    $("form").submit(event => {
    event.preventDefault();
    const userName = $("#js-username").val();
    console.log("watchForm()ran.");
    $(".userName").text(`GitHub Repositories for ${userName}`);
    getUserRepos(userName);
    });
}

$(watchForm);