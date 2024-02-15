export class Map {
constructor(data) {
    this.data = data;
    this.isInited = false;
}

    async init() {
        if(this.isInited) {
            return;
        }
        let userLocation = localStorage.getItem("location")
        if(userLocation === null) {
            userLocation = {
                "location": [51.505, -0.09],
                "zoom": 4
            }
        }
        else {
            userLocation = JSON.parse(userLocation)
        }
        var map = L.map('map').setView(userLocation.location, userLocation.zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.on("dragend", (event) => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const userLocation = {
                "location": [center.lat, center.lng],
                "zoom": zoom
            }
            localStorage.setItem("location", JSON.stringify(userLocation))
        })

        this.data.forEach(element => {
            if(typeof element.reclat === "undefined" || typeof element.reclong === "undefined") {
                return
            }
            var circle = L.circle([element.reclat, element.reclong], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
        });
        this.isInited = true;
    }
}
