let page = 1;
document.addEventListener("load", getData(page).then((res) => appendData(res)));

async function getData(page = 1) {
    let data = [];
    await fetch(`https://www.balldontlie.io/api/v1/players?per_page=10&page=${page}`)
        .then((res) => res.json())
        .then((res) => {
            data = res.data;
        });
    return data;
}

function appendData(data) {
    let mainContainer = document.querySelector(".maincontainer");
    mainContainer.innerHTML = "";

    data.map((elem) => {
        let mainContainer = document.querySelector(".maincontainer");
        let Card = document.createElement("div");
        Card.setAttribute("class", "playerCard");
        let id = document.createElement("p");
        id.innerText = elem.id;
        let image = document.createElement("img");
        image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&usqp=CAU";
        let fullName = document.createElement("p");
        fullName.innerText = `Name : ${elem.first_name + " " + elem.last_name}`;
        let position = document.createElement("p");
        position.innerText = `Position : ${elem.position}`;
        let teamDetails = document.createElement("button");
        teamDetails.innerText = "Team Details";
        teamDetails.addEventListener("click", () => {
            openModal(elem);
        });
        Card.append(id, image, fullName, position, teamDetails);
        mainContainer.append(Card);
    });
    if (page === 1) {
        document.querySelector(".decPage").disabled = true;
    } else {
        document.querySelector(".decPage").disabled = false;
    }
    document.querySelector(".page").innerText = page;
};


function openModal(elem) {
    let modal = document.querySelector(".modal");
    modal.classList.add("activateModal");
    modal.innerHTML = "";
    document.querySelector(".transparent").classList.add("activateTransparent");


    let Card = document.createElement("div");
    Card.setAttribute("class", "playerCard");
    let image = document.createElement("img");
    image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&usqp=CAU";
    let fullName = document.createElement("p");
    fullName.innerText = `Name : ${elem.first_name + " " + elem.last_name}`;
    let position = document.createElement("p");
    position.innerText = `Position : ${elem.position}`;
    let heading = document.createElement("h1");
    heading.innerText = "Team Details";
    let team = document.createElement("p");
    team.innerText = `Team : ${elem.team.full_name}`;
    let abbr = document.createElement("p");
    abbr.innerText = `Abbr : ${elem.team.abbreviation}`;
    let conference = document.createElement("p");
    conference.innerText = `Conference : ${elem.team.conference}`;
    let division = document.createElement("p");
    division.innerText = `Division : ${elem.team.division}`;
    let city = document.createElement("p");
    city.innerText = `City : ${elem.team.city}`;
    Card.append(image, fullName, position, heading, team, abbr, conference, division, city);
    modal.append(Card);
}

document.querySelector(".transparent").addEventListener("click", closeModel);

function closeModel() {
    document.querySelector(".modal").classList.remove("activateModal");
    document.querySelector(".transparent").classList.remove("activateTransparent");
}

function handleClick(payload) {
    page = page + payload;
    getData(page).then((res) => appendData(res));
}

document.querySelector(".searchBtn").addEventListener("click", searchFunction);

function searchFunction() {
    let str = document.querySelector("input").value;
    if (str !== "") {
        searchData(str).then((res) => appendData(res));
    } else {
        alert("please enter name first");
    }
}

async function searchData(query){
    let data = [];
    await fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
            .then((res) => res.json())
                .then((res) => data = res.data);
    return data;
}