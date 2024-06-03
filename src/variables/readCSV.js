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

export function parseInput(input){
    // input is year then return string year, else return string quarter-year
    let pattern = /^\d{4}$/;
    if (pattern.test(input)) {
      return input.toString();
    } else {
      // quarter is in roman numeral, convert to decimal
      let quarter = input.split('-')[0];
      let year = input.split('-')[1];
      let quarterDecimal = 0;
      switch (quarter) {
        case 'I':
          quarterDecimal = 1;
          break;
        case 'II':
          quarterDecimal = 2;
          break;
        case 'III':
          quarterDecimal = 3;
          break;
        case 'IV':
          quarterDecimal = 4;
          break;
        default:
          break;
      }
      return `${quarterDecimal}-${year}`;
    }
  }

export async function getData(input) {
    if (input === "Total") return getAllDataset();

    // if input is yyyy
    if (input.length === 4) {
        // input is string, convert to number
        const year = parseInt(input);
        return getYearData(year);
    }
    // if input is q-yyyy
    else {
        // console.log("quarter - year" + input);
        // format: q-yyyy
        // quarter in roman numeral
        input = parseInput(input);
        const quarter = parseInt(input.split('-')[0]);
        const year = parseInt(input.split('-')[1]);
        return getQuarterData(quarter, year);
    }
}

async function getAllDataset(){
    const data = await readCSV();
    return data;

}

async function getYearData(year){
    const data = await readCSV();
    // console.log(data);
    //pick data for the given year
    const yearData = data.filter((row) => {
        const date = new Date(row.Date);
        return date.getFullYear() === year;
    });
    // Open,High,Low,Close,Adj Close,Volume
    const averageMonth = Array.from({ length: 12 }, () => ({
        "Open": 0,
        "High": 0,
        "Low": 0,
        "Close": 0,
        "Adj Close": 0,
        "Volume": 0
    }));
    let monthAppear = Array.from({ length: 12 }, () => 0);
    // calculate average of each month
    yearData.forEach((row) => {
        const date = new Date(row.Date);
        // all column Open,High,Low,Close,Adj Close,Volume
        averageMonth[date.getMonth()]["Open"] += parseFloat(row.Open);
        averageMonth[date.getMonth()]["High"] += parseFloat(row.High);
        averageMonth[date.getMonth()]["Low"] += parseFloat(row.Low);
        averageMonth[date.getMonth()]["Close"] += parseFloat(row.Close);
        averageMonth[date.getMonth()]["Adj Close"] += parseFloat(row["Adj Close"]);
        averageMonth[date.getMonth()]["Volume"] += parseFloat(row.Volume);
        monthAppear[date.getMonth()] += 1;
    });
    // calculate average
    averageMonth.forEach((month) => {
        month["Open"] /= monthAppear[averageMonth.indexOf(month)];
        month["High"] /= monthAppear[averageMonth.indexOf(month)];
        month["Low"] /= monthAppear[averageMonth.indexOf(month)];
        month["Close"] /= monthAppear[averageMonth.indexOf(month)];
        month["Adj Close"] /= monthAppear[averageMonth.indexOf(month)];
        month["Volume"] /= monthAppear[averageMonth.indexOf(month)];
    });
    return averageMonth;
}

async function getQuarterData(quarter, year){
    const data = await readCSV();

    //pick data for the given quarter and year
    const quarterData = data.filter((row) => {
        const date = new Date(row.Date);
        return date.getFullYear() === year && Math.floor(date.getMonth() / 3) + 1 === quarter;
    });
    // return Adj Close column
    // return quarterData.map((row) => parseFloat(row["Adj Close"]));
    // return all columns
    return quarterData;
}

export default readCSV;
