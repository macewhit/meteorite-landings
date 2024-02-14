export class Map {
constructor(data) {
    this.data = data;
    this.isInited = false;
}

    async init() {
        if(this.isInited) {
            return;
        }
        var map = L.map('map').setView([51.505, -0.09], 4);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

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
