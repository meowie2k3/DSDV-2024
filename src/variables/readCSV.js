import Papa from 'papaparse';

const dataLink = "https://raw.githubusercontent.com/meowie2k3/DSDV-2024/main/src/assets/csv/AAPL.csv?token=GHSAT0AAAAAACQ2A2SLO3HHAEO57VLGLHOYZR6KQVA"




// Import PapaParse library

function readCSV(){
    Papa.parse(dataLink, {
        download: true,
        header: true,
        complete: function(results) {
        console.log(results);
        }
    });
}
export default readCSV;