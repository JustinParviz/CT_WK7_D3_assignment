const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    let f1Racers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(f1Racers)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings  //list of objects/dictionaries 
} 


const createList = (position, points, givenName, familyName, nationality, constructorId) => {
    const fullName = givenName + " " + familyName
    const sponsor = constructorId
    const html = `
    <tr>
        <td>${position}</td>
        <td>${fullName}</td>
        <td>${nationality}</td>
        <td>${sponsor}</td>
        <td>${points}</td>
    </tr>
    `
    // searching the DOM for class of .rangers-list and then inserting our html into that div
    document.querySelector(".racer-data").insertAdjacentHTML('beforeend', html)
}


// Create a function to "load" the data from the API
const loadData = async (season, round) => {
    const f1Racers = await getData(season, round)

    // We want to loop through rangers list of dictionaries and call the createList function for each dictionary. Need to match
    // the parameters of (id, name, color, season, coin) with arguments coming from the dictionaries
    
    // same as saying 'for ranger in rangers'
    f1Racers.forEach(f1Racer => {
        // const coin = ranger['power-coin'] ? ranger['power-coin'] : ranger['morp-coin']
        createList(f1Racer.position, f1Racer.points, f1Racer.Driver.givenName, f1Racer.Driver.familyName, f1Racer.Driver.nationality, f1Racer.Constructors[0].constructorId);
    });
    
}

// function to clear our data
const clearData = () => {
    document.querySelector(DOMElements['alexsupercoolkey']).innerHTML = ""
}


let form = document.querySelector('#test-data-form')

// Add an event listener on this form 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // two different ways to select something
    // first is if you know attributes from html
    let querySeason = document.querySelector('#season').value
    let queryRound = document.querySelector('#round').value
    loadData (querySeason, queryRound)
})