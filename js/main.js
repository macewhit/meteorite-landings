import { TableData } from "./table.js";

export async function getData() {
  const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
  const meteorites = await response.json();
  console.log(meteorites);
  return meteorites
}

getData().then(data => {
  new TableData(data).init()
})
