let page = 1;
document.querySelector(".searchBtn").addEventListener("click", searchFunction);

function searchFunction() {
    let startDate = document.querySelector(".startDate").value;
    let endDate = document.querySelector(".endDate").value;
    if (startDate !== "" && startDate !== "") {
        getGameByDate(startDate, endDate, page).then((res) => appendData(res));
    } else {
        alert("Please Enter the both date");
    }
}

async function getGameByDate(startDate, endDate, page) {
    let data = await fetch(`https://www.balldontlie.io/api/v1/games?start_date=${startDate}&end_date=${endDate}&per_page=10&page=${page}`)
        .then((res) => res.json())
        .then((res) => res.data);
    return data;
}

function appendData(data) {
    let mainContainer = document.querySelector(".mainContainer");
    mainContainer.innerHTML = "";
    if (data.length > 0) {
        data.map((elem) => {
            let mainContainer = document.querySelector(".mainContainer");
            let Card = document.createElement("div");
            Card.setAttribute("class", "gameCard");
            let smallCard1 = document.createElement("div");
            smallCard1.setAttribute("class" , "smallCard");
            let smallCard2 = document.createElement("div");
            smallCard2.setAttribute("class" , "smallCard");
            let image1 = document.createElement("img");
            image1.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4T04Lrzw6_178wy8DWRNqaZJ5pYQkTKYNQ&usqp=CAU";
            let image2 = document.createElement("img");
            image2.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4T04Lrzw6_178wy8DWRNqaZJ5pYQkTKYNQ&usqp=CAU";
            let team1 = document.createElement("h1");
            team1.innerText = elem.home_team.full_name;
            let team2 = document.createElement("h1");
            team2.innerText = elem.visitor_team.full_name;
            let date1 = document.createElement("p");
            date1.innerText = `Date : ${elem.date}`;
            let date2 = document.createElement("p");
            date2.innerText = `Date : ${elem.date}`;
            let season1 = document.createElement("p");
            season1.innerText = `Season : ${elem.season}`;
            let season2 = document.createElement("p");
            season2.innerText = `Season : ${elem.season}`;
            let status1 = document.createElement("p");
            status1.innerText = `Status : ${elem.status}`;
            let status2 = document.createElement("p");
            status2.innerText = `Status : ${elem.status}`;
            let team1Score = document.createElement("p");
            team1Score.innerText = `Home Team Score : ${elem.home_team_score}` 
            let team2Score = document.createElement("p");
            team2Score.innerText = `Visitor Team Score : ${elem.visitor_team_score}` 
            let division1 = document.createElement("div");
            division1.innerText = `Division : ${elem.home_team.division}`;
            let division2 = document.createElement("div");
            division2.innerText = `Division : ${elem.visitor_team.division}`;
            let wonStatus1 = document.createElement("span");
            let wonStatus2 = document.createElement("span");
            if(elem.home_team_score > elem.visitor_team_score){
                wonStatus1.innerText = "WON";
                wonStatus1.style.color = "green";
                wonStatus2.innerText = "LOST";
                wonStatus2.style.color = "red";
            }else if(elem.home_team_score < elem.visitor_team_score){
                wonStatus2.innerText = "WON";
                wonStatus2.style.color = "green";
                wonStatus1.innerText = "LOST";
                wonStatus1.style.color = "red";
            }else{
                wonStatus2.innerText = "TIE";
                wonStatus2.style.color = "orange";
                wonStatus1.innerText = "TIE";
                wonStatus1.style.color = "orange";
            }
            let vsCard = document.createElement("h1");
            vsCard.innerText = "VS";
            team1.append(wonStatus1);
            team2.append(wonStatus2);
            smallCard1.append(image1,team1,date1,season1,status1,team1Score, division1);
            smallCard2.append(image2,team2,date2,season2,status2,team2Score, division2);
            Card.append(smallCard1,vsCard,smallCard2);
            mainContainer.append(Card);
        });
    } else {
        let mainContainer = document.querySelector(".mainContainer");
        let responce = document.createElement("h1");
        responce.setAttribute("class" , "responce");
        responce.innerText = "No Games Found";
        mainContainer.append(responce);
    }
    if (page === 1) {
        document.querySelector(".decPage").disabled = true;
    } else {
        document.querySelector(".decPage").disabled = false;
    }
    document.querySelector(".page").innerText = page;
}

function handleClick(payload) {
    page = page + payload;
    searchFunction();
}

function handleChange(value){
    getGameByYear(value).then((res) => {
        console.log(res);
        appendData(res);
    });
}

async function getGameByYear(value){
    return await fetch(`https://www.balldontlie.io/api/v1/games?start_date=${`${value}-01-01`}&end_date=${`${value}-12-31`}`)
                        .then((res) => res.json())
                            .then((res) => res.data);
}