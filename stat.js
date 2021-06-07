let canvas = document.getElementById("myChart");
const url = "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1";
var date = new Date();
const months = [
  "january",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October ",
  "November",
  "December",
];
let labels = [];
let data = [];
let responseJson;
let visualisation = 0;
let chart;
let test =5;
window.onload= function(){
  getResponse(url);
  GetStat();
}
 

async function getResponse(url) {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      'Accept-Encoding': 'gzip'
    },
  });
  if (response.ok) {
      responseJson = await response.json();
      for (let key in responseJson.data) {
        if (
          responseJson.data[key].date ==`${date.getFullYear()}-0${date.getMonth() - 1}-25T00:00:00.000Z`
        ) {
          for (i = 0; i < 22  ; i++) {
            labels.push(responseJson.data[key - 31 * i].date.slice(0,10));
            data.push(Math.trunc(responseJson.data[key - 31 * i].priceUsd))
          }
        }
      }
      chart.data.labels = labels;
      chart.data.datasets.data= data;
      chart.update();
    }  else {
    alert("HTTP: ERROR ");
  }
  console.log(   chart.data.labels, chart.data.datasets.data)
}

function GetStat() {
  chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bitcoin (USD) $',
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

 
