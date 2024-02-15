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
            mass = parseFloat(info.mass);
            if(mass != Math.floor(mass)) {
                mass = parseFloat(info.mass).toFixed(2);
            }
        }

        let src = "images/heart_empty.svg";
        if(info.liked) {
            src = "images/heart_full.svg";
        }

        return `<div class="table-row">
        <div class="table-cell like-btn" data-name="${info.name}"><img src="${src}"></div>
        <div class="table-cell">${year}</div>
        <div class="table-cell">${info.name}</div>
        <div class="table-cell mobile-table">${mass}</div>
        <div class="table-cell mobile-table">${info.recclass}</div>
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

        const likeBtns = document.querySelectorAll(".like-btn");
        likeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const name = btn.getAttribute("data-name")
                // 1. update this.data so that the entry with name toggles "like" (maybe with this.data.map)
                this.data = this.data.map((meteor) => {
                    if(meteor.name === name) {
                        meteor.liked = !meteor.liked;
                    }
                    return meteor;
                })
                // 2. update the liked list in local storage
                let liked = window.localStorage.getItem("liked") // grab from localstorage
                if(liked === null) {
                    liked = "[]";
                }
                liked = JSON.parse(liked);
                const index = liked.indexOf(name);
                if(index > -1) {
                    liked.splice(name, 1);
                }
                else {
                    liked.push(name);
                }
                localStorage.setItem("liked", JSON.stringify(liked));
                this.init();
            })
        })
    }
}