// import Chart from 'chart.js/auto'

export default class Charts {
    constructor(data) {
        this.data = data;
    }

    async init() {
        this.loadChartData(this.data);
    }

    loadChartData(list) {

    }
    async loadChartData(data) {
        // Time line Bar graph, how many meteors each year
        const years = data.filter(item => typeof item.year !== "undefined").map(item => parseInt(item.year.slice(0, 4)));
        const counts = {};
        years.forEach(year => {
            if(typeof counts[year] === "undefined") {
                counts[year] = 1
            }
            else {
                counts[year] += 1
            }
        })
        const barChartData = Object.entries(counts).map((entry) => {
            const year = entry[0]
            const count = entry[1]
            return {year: year, count: count}
        })
        barChartData.sort((a, b) => a.year - b.year)

        // line chart to show mass
        const allMass = data.filter(item => typeof item.mass !== "undefined").map(item => parseInt(item.mass));
        const massCounts = {
            "0": 0,
            "<10g": 0,
            "10g-100g": 0,
            "100g-300g": 0,
            "300g-600g": 0,
            "600g-1000g": 0,
            "1000g-1500g": 0,
            "1500g-2500g": 0,
            "2500g-5000g": 0,
            "5000g-10000g": 0,
            "10000g-20000g": 0,
            "20000g-50000g": 0,
            ">50000g": 0

        };
        allMass.forEach(mass => {
            if(mass < 50) {
                massCounts["<10g"] += 1
            }
            else if(mass < 100) {
                massCounts["10g-100g"] += 1
            }
            else if(mass < 300) {
                massCounts["100g-300g"] += 1
            }
            else if(mass < 600) {
                massCounts["300g-600g"] += 1
            }
            else if(mass < 1000) {
                massCounts["600g-1000g"] += 1
            }
            else if(mass < 1500) {
                massCounts["1000g-1500g"] += 1
            }
            else if(mass < 2500) {
                massCounts["1500g-2500g"] += 1
            }
            else if(mass < 5000) {
                massCounts["2500g-5000g"] += 1
            }
            else if(mass < 10000) {
                massCounts["5000g-10000g"] += 1
            }
            else if(mass < 20000) {
                massCounts["10000g-20000g"] += 1
            }
            else if(mass < 50000) {
                massCounts["20000g-50000g"] += 1
            }
            else if(mass >50000) {
                massCounts[">50000g"] += 1
            }
            else{
                massCounts["0"] += 1
            }
        })
        const lineChartData = Object.entries(massCounts).map((entry) => {
            const mass = entry[0]
            const count = entry[1]
            return {mass: mass, count: count}
        })


        const allClasses = data.filter(item => typeof item.recclass !== "undefined").map(item => item.recclass);
        const classCounts = {};
        allClasses.forEach(recclass => {
            if(typeof classCounts[recclass] === "undefined") {
                classCounts[recclass] = 1
            }
            else {
                classCounts[recclass] += 1
            }
        })

        // Pie Chart to show classifications
        const pieChartData = Object.entries(classCounts).map((entry) => {
            const recclass = entry[0]
            const count = entry[1]
            return {recclass: recclass, count: count}
        })

        // Timeline Bar Graph
        new Chart(
          document.querySelector('#timeline'),
          {
            type: 'bar',
            options: {
                animation: false,
                plugins: {
                  legend: {
                    display: true
                  },
                }
            },
            data: {
              labels: barChartData.map(row => row.year),
              datasets: [
                {
                  label: 'Meteorites by year',
                  data: barChartData.map(row => row.count)
                }
              ]
            }
          }
        );

        // Mass Line Graph
        new Chart(
            document.querySelector('#mass-line'),
            {
              type: 'line',
              options: {
                xAxisID: 'Mass (g)',
                yAxisID: 'Number of Meteorites'
              },
              data: {
                labels: lineChartData.map(row => row.mass),
                datasets: [
                  {
                    label: 'Meteorites grouped by mass',
                    data: lineChartData.map(row => row.count)
                  }
                ]
              }
            }
          );

        // Classification Pie Chart
        new Chart(
            document.querySelector('#classes'),
          {
            type: 'pie',
            options: {
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                }
            },
            data: {
              labels: pieChartData.map(row => row.recclass),
              datasets: [
                {
                  label: 'Number of classifications',
                  data: pieChartData.map(row => row.count),
                  backgroundColor: [
                    '#OD1E40',
                    '#265D73',
                    '#AEEBF2',
                    '#328C8C',
                    '#49BF9E'
                  ],
                  hoverOffset: 2
                }
              ]
            }
          }
        );
      }
    }