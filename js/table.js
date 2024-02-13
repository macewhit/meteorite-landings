export class TableData {
    constructor(data, sortFunc=null) {
        this.data = data
        this.sortFunc = sortFunc
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
        if(this.sortFunc !== null) {
            list = list.toSorted(this.sortFunc)
        }
        const tbody = list.map(this.renderInfo).join("")
        table.innerHTML = tbody
    }
}