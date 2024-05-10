import readCSV from "./readCSV";

const filePath = '/assets/csv/AAPL.csv';

const processData = async () => {
    const data
    = await readCSV(filePath);
    console.log(data);
}