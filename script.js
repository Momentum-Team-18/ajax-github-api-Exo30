let mainContainer = document.getElementById("mainContainer");
let profileURL = 'https://api.github.com/users/Exo30'
let repos = 'https://api.github.com/users/Exo30/repos'
let cardCreated = false;


let fetchData = function(data) {
return fetch(data, {
    method: "GET",
    headers: { "Content-type": "application/json" },
})
.then((response) => {
 return response.json()
})
.then((userData) => {
    if (cardCreated === false){
    createUserCard(userData)
    cardCreated = true;
    } else {
        createRepoList(userData)
    }
})

}

let createUserCard = function(userData) {
  let query = ["avatar_url", "name", "location", "html_url", "login", "repos_url"];
  //console.log(userData)

 for (let type of query){
    if(type.slice(type.length - 3, type.length) === 'url'){
        if (type === "avatar_url") {
            let loginDiv = document.createElement("img");
            loginDiv.setAttribute('src', userData[type])
            mainContainer.append(loginDiv)
        } else {
        let loginDiv = document.createElement("a");
        loginDiv.setAttribute("href", userData[type])
        loginDiv.append(type + ': ' + userData[type]);
        mainContainer.append(loginDiv)
        }
    } else {
    let loginDiv = document.createElement("div");
    loginDiv.append(type + ': ' + userData[type]);
    mainContainer.append(loginDiv)
    }
 }
}

let createRepoList = function(userData) {
  
  for (let repos in userData) {
    var repoDiv = document.createElement("div")
    var repoLink = document.createElement("a");
   


    var source = userData[repos]
    var text = document.createTextNode(source["full_name"]);
    repoLink.setAttribute("href", source['git_url']);
    repoLink.appendChild(text)
    repoDiv.append(repoLink)
    mainContainer.append(repoDiv)
    
  }
  console.log(mainContainer)
}

fetchData(profileURL)
fetchData(repos)
