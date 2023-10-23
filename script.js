const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const repo_no = document.getElementById('repo_no');
const user_location = document.getElementById('user_location');
const bio = document.getElementById('bio');
const avatar = document.getElementById('avatar');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const user_link = document.getElementById('user_link');
const searchbtn = document.getElementById('searchbtn');
const user_search = document.getElementById('user_search');

//For Background Animation
window.onload = function() {
  Particles.init({
    selector: '.background'
  });
};

var particles = Particles.init({
  selector: '.background',
  color: ['#DA0463', '#404B69', '#DBEDF3'],
  connectParticles: true
});




const userData = (query) => {
  const options = {
    method: "GET"
  };
  fetch("https://api.github.com/users/" + query, options)
  .then(response => {
    if (response.status === 404) {     
      window.location.href = "error.html";  // User not found, redirect to error.html
    } else {
      return response.json();
    }
  })
    .then((response) => {
      console.log(response);
      avatar.src = response.avatar_url; //For retrieving avatar image
      fullname.innerText = response.name; //For retrieving full name
      username.innerText = response.login; //For retrieving the username 
      followers.innerText = response.followers; //For retrieving the number of followers
      following.innerText = response.following; //For retrieving the number of following
      user_link.href = response.html_url; //For retrieving the link of the user's github profile
      bio.innerText = response.bio; //For retrieving the user bio
      user_location.innerText = response.location; //For retrieving the user location
      repo_no.innerText = response.public_repos; //For retrieving the number of public repositories
    })
    .catch(err => {
      console.error(err); //For error handling
    })
}

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();

  userData(user_search.value);
  user_search.value = "";
})

//Toggle Function
function toggleModal() {
  document.getElementById('modal').classList.toggle('hidden')
}