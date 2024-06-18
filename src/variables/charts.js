import { parseInput } from "./readCSV";
// chartExample1 and chartExample2 options
export let linechar1 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
        autoSkip: false,
        maxRotation: 90,
        minRotation: 45,
      },
    },
  },
};

export let barChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      gridLines: {
        drawBorder: false,
        color: "rgba(225,78,202,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 120,
        padding: 20,
        fontColor: "#9e9e9e",
      },
    },
    xAxes: {
      gridLines: {
        drawBorder: false,
        color: "rgba(225,78,202,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9e9e9e",
        autoSkip: false,
        maxRotation: 90,
        minRotation: 45,
      },
    },
  },
};

function getQuarterLabel(quarter, year) {
  // return an array of labels for the given month and year
  let labels = [];
  // get monday date of weeks in given quarter and year
  let date = new Date(year, quarter * 3 - 3, 1);

  //console.log(date);

  // move to first monday of the month
  while (date.getDay() !== 2) {
    date.setDate(date.getDate() + 1);
    //console.log(date);
  }

  let endQuarter = date.getMonth() + 3;

  //console.log(date.getMonth() + " " + endQuarter);

  while (date.getMonth() < endQuarter && date.getFullYear() === year) {
    labels.push(date.toISOString().split("T")[0]);
    date.setDate(date.getDate() + 7);
  }

  // reformat to dd-mm-yyyy, if <10 add 0
  labels = labels.map((label) => {
    let date = new Date(label);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
      }-${year}`;
  });

  return labels;
}

function getYearLabel(year) {
  // return an array of labels for the given year
  let labels = [];
  for (let i = 0; i < 12; i++) {
    // name of the month
    let month = new Date(year, i, 1).toLocaleString("default", { month: "short" });
    labels.push(`${month}-${year}`);
  }
  return labels;
}


function getLabel(input) {
  // if input is yyyy
  if (input.length === 4) {
    // input is string, convert to number
    const year = parseInt(input);
    return getYearLabel(year);
  }
  // if input is q-yyyy
  if (input.length === 6 || input.length === 7 || input.length === 8) {
    // format: q-yyyy
    // quarter in roman numeral
    input = parseInput(input);
    const quarter = parseInt(input.split("-")[0]);
    const year = parseInt(input.split("-")[1]);
    return getQuarterLabel(quarter, year);
  }
  else {
    // total
    // 184 empty labels
    let label = new Array(184).fill("");
    //2014
    label[0] = "2014";
    label[14] = "2015";
    label[66] = "2016";
    label[118] = "2017";
    label[170] = "2018";
    return label;
  }
}

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
export function ChartExample1(data, time) {

  return {
    labels: getLabel(time),
    datasets: [
      {
        label: "AAPL Stock Price",
        fill: true,
        backgroundColor: "rgba(29,140,248,0.1)",
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: time === "Total" ? 2 : 3,
        data: data.map((row) => parseFloat(row["Adj Close"])),
      },
    ],
  };
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
export function chartExample3(data, time) {

    return {
      labels: getLabel(time),
      datasets: [
        {
          label: "Low Price",
          type: "line",
          fill: true,
            backgroundColor: "rgba(72,72,176,0)",
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: time === "Total" ? 1 : 2,
          data: data.map((row) => parseFloat(row["Low"])),
        },
        {
          label: "High Price",
          type: "line",
          fill: true,
          backgroundColor: "rgba(72,72,176,0)",
          borderColor: "#fbc658",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fbc658",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#fbc658",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: time === "Total" ? 1 : 2,
          data: data.map((row) => parseFloat(row["High"])),
        },
        {
          label: "Volume (in million)",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.1)",
          hoverBackgroundColor: "rgba(72,72,176,0.1)",
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: data.map((row) => parseFloat(row["Volume"]) / 1000000),
        },
      ],
    };
};

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// export const chartExample4 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
//     gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
//     gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

//     return {
//       labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#00d6b4",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#00d6b4",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#00d6b4",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: [90, 27, 60, 12, 80],
//         },
//       ],
//     };
//   },
//   options: {
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },

//     tooltips: {
//       backgroundColor: "#f5f5f5",
//       titleFontColor: "#333",
//       bodyFontColor: "#666",
//       bodySpacing: 4,
//       xPadding: 12,
//       mode: "nearest",
//       intersect: 0,
//       position: "nearest",
//     },
//     responsive: true,
//     scales: {
//       yAxes: {
//         barPercentage: 1.6,
//         gridLines: {
//           drawBorder: false,
//           color: "rgba(29,140,248,0.0)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           suggestedMin: 50,
//           suggestedMax: 125,
//           padding: 20,
//           fontColor: "#9e9e9e",
//         },
//       },
//       xAxes: {
//         barPercentage: 1.6,
//         gridLines: {
//           drawBorder: false,
//           color: "rgba(0,242,195,0.1)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           padding: 20,
//           fontColor: "#9e9e9e",
//         },
//       },
//     },
//   },
// };
