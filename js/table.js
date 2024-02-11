// import { getData } from "./main";



export class TableData {
    constructor(data) {
        this.data = data
    }
    async init() {
        this.loadTableData(this.data);
    }
    renderInfo(info) {
        let year = ""
        if(typeof info.year !== "undefined") {
            year = info.year.slice(0, 4)
        }
        return `<tr >
        <td>${year}</td>
        <td>${info.name}</td>
        <td>${info.mass}</td>
        <td>${info.recclass}</td>
      </tr>`
    }
    loadTableData(list) {
        var table = document.querySelector("#meteorite-table > tbody");
        const tbody = list.map(this.renderInfo).join("")
        table.innerHTML = tbody
    }
}