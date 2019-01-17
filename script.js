'use strict';

const searchURL = 'https://api.github.com/users/';

function watchForm() {
  console.log('watchForm ran');
  $('form').submit(event => {
    event.preventDefault();
    let handle = getHandle();
    getUserRepos(handle, searchURL);
  })
}

function getHandle() {
  console.log('getHandle has run')
  let userHandle = $('#js-search-term').val();
  return userHandle;
}

function getUserRepos(handle, url) {
  let queryString = `${url}${handle}/repos`;
  //console.log('getUserRepos ran ' + queryString);
  fetch(queryString)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
  })
    .then(responseJson => getUserRepoFromArr(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function getUserRepoFromArr(arr) {
  console.log('getUserRepoFromArr has run')
  //console.log(arr[0]['name'])
  let repos = '';
  for (let i = 0; i < arr.length; i++) {
    repos = repos + `
          <div class="repos">
              <a href="${arr[i]['html_url']}" target="_blank">${arr[i]['name']}</a>
          </div>` 
  }
  return displayResults(repos);
};

function displayResults(repos) {
  $(".repos").empty();
  $(".repos").html(
    `<div class="links">
        ${repos}
     </div>`);
  $('.results').removeClass('hidden')
  console.log('displayResults has ran');
}


$(watchForm);