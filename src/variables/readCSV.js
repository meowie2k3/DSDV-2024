import Papa from 'papaparse';
const dataPath = './AAPL.csv';


// Import PapaParse library

function readCSV(){
    // Read CSV file
    fetch( dataPath )
    .then( response => response.text() )
    .then( responseText => {
        // -- parse csv
        var data = Papa.parse(responseText);
        console.log('data:', data);
    });
}
export default readCSV;