import { TableData } from "./table.js";
import { Map } from "./map.js";

export async function getData() {
  const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
  const meteorites = await response.json();
  console.log(meteorites);
  return meteorites
}

let map = null;
let table = null;

getData().then(data => {
  table = new TableData(data);
  table.init();
  map = new Map(data);
})

// Date
const d = new Date();
const year = d.getFullYear();

document.querySelector("#currentyear").textContent = year;
document.getElementById("lastupdated").textContent = `Last Updated: ${document.lastModified}`;

// Toggle
const mapBtn = document.querySelector("#toggle-map");
const tableBtn = document.querySelector("#toggle-table");
const chartBtn = document.querySelector("#toggle-chart");

const meteorTable = document.querySelector("#table-section");
const meteorMap = document.querySelector("#map-container");
const meteorChart = document.querySelector("#meteorite-charts");

mapBtn.addEventListener("click", () => {
  meteorMap.classList.remove("hidden");
  meteorTable.classList.add("hidden");
  meteorChart.classList.add("hidden");

  mapBtn.classList.add("active");
  tableBtn.classList.remove("active");
  chartBtn.classList.remove("active");
  if(map !== null) {
    map.init();
  }
  });
tableBtn.addEventListener("click", () => {
  meteorTable.classList.remove("hidden");
  meteorMap.classList.add("hidden");
  meteorChart.classList.add("hidden");

  tableBtn.classList.add("active");
  mapBtn.classList.remove("active");
  chartBtn.classList.remove("active");
});
chartBtn.addEventListener("click", () => {
  meteorChart.classList.remove("hidden");
  meteorMap.classList.add("hidden");
  meteorTable.classList.add("hidden");

  chartBtn.classList.add("active");
  mapBtn.classList.remove("active");
  tableBtn.classList.remove("active");
});

// sorting
const toggleBtns = document.querySelectorAll(".sort-toggle")
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if(btn.classList.contains("ascending") || btn.classList.contains("decending")) {
      if(btn.classList.contains("ascending")) {
        btn.classList.remove("ascending");
        btn.classList.add("decending");
      }
      else {
        btn.classList.remove("decending");
        btn.classList.add("ascending");
      }
    }
    else {
      toggleBtns.forEach((otherBtn) => {
        otherBtn.classList.remove("ascending", "decending");
      })
      btn.classList.add("ascending");
    }
    const dataToggle = btn.getAttribute("data-toggle");
    if(btn.classList.contains("ascending")) {;
      table.sortFunc = (a, b) => {
        return a[dataToggle] > b[dataToggle];
      }
    }
    else {
      table.sortFunc = (a, b) => {
        return a[dataToggle] < b[dataToggle];
      }
    }
    table.init();
  })
})

const searchBar = document.querySelector("#search-query");
searchBar.addEventListener("input", (event) => {
  table.searchQuery = searchBar.value
  table.init()
})
