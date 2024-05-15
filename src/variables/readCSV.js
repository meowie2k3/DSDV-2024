import Papa from "papaparse";

const dataLink =
  "https://raw.githubusercontent.com/meowie2k3/DSDV-2024/main/src/assets/csv/AAPL.csv";

// Import PapaParse library

async function readCSV() {
    // Fetch the CSV file
    const response = await fetch(dataLink);
    const reader = response.body.getReader();
    const result = await reader.read(); // raw array
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value); // the csv text
    const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
    const rows = results.data; // array of objects
    return rows;
}

export async function InputTime(input) {
    if (input === "total") getAllDataset();

    // if input is yyyy
    if (input.length === 4) {
        // input is string, convert to number
        const year = parseInt(input);
        return getYearDate(year);
    }
    // if input is q-yyyy
    if (input.length === 6) {
        const quarter = parseInt(input[0]);
        const year = parseInt(input.slice(2));
        return getQuarterData(quarter, year);
    }
}

async function getAllDataset(){
    const data = await readCSV();
    

}

export async function getYearDate(year){
    const data = await readCSV();

    //pick data for the given year
    const yearData = data.filter((row) => {
        const date = new Date(row.Date);
        return date.getFullYear() === year;
    });

    const averageMonth = new Array(12).fill(0);
    // calculate average of each month
    yearData.forEach((row) => {
        const date = new Date(row.Date);
        averageMonth[date.getMonth()] += parseFloat(row["Adj Close"]);
    });
    // return Adj Close column
    return averageMonth.map((month) => month / 12);
}

export async function getQuarterData(quarter, year){
    const data = await readCSV();

    //pick data for the given quarter and year
    const quarterData = data.filter((row) => {
        const date = new Date(row.Date);
        return date.getFullYear() === year && Math.floor(date.getMonth() / 3) + 1 === quarter;
    });
    // return Adj Close column
    return quarterData.map((row) => parseFloat(row["Adj Close"]));
}

export default readCSV;
