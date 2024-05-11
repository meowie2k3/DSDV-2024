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
export default readCSV;
