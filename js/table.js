export class TableData {
    constructor(data, sortFunc=null) {
        this.data = data;
        this.sortFunc = sortFunc;
        this.searchQuery = '';
    }
    async init() {
        this.loadTableData(this.data);
    }
    renderInfo(info) {
        let year = "";
        if(typeof info.year !== "undefined") {
            year = info.year.slice(0, 4);
        }
        let mass = ""
        if(typeof info.mass !== "undefined") {
            mass = parseFloat(info.mass)
            if(mass != Math.floor(mass)) {
                mass = parseFloat(info.mass).toFixed(2);
            }
        }
        return `<div class="table-row">
        <div class="table-cell">${year}</div>
        <div class="table-cell">${info.name}</div>
        <div class="table-cell">${mass}</div>
        <div class="table-cell">${info.recclass}</div>
        </div>
      `
    }
    loadTableData(list) {
        var table = document.querySelector("#meteorite-table .table-body");
        if(this.sortFunc !== null) {
            list = list.toSorted(this.sortFunc);
        }
        if(this.searchQuery.length > 0) {
            list = list.filter((element) => {
                if(typeof element.year !== "undefined" && element.year.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) {
                    return true;
                }
                if(typeof element.name !== "undefined" && element.name.toLowerCase().includes(this.searchQuery)) {
                    return true;
                }
                if(typeof element.mass !== "undefined" && element.mass.toString().toLowerCase().includes(this.searchQuery)) {
                    return true;
                }
                if(typeof element.recclass !== "undefined" && element.recclass.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                    return true;
                }
                return false
            })
        }
        const tbody = list.map(this.renderInfo).join("");
        table.innerHTML = tbody;
    }
}