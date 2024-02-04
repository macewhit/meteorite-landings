async function getData() {
    const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
    const meteorites = await response.json();
    console.log(meteorites);
  }

  getData()