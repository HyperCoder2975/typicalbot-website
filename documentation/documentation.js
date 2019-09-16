window.onload = function() {
    initClickEvents()
    onLocationChange()
    var clipboard = new ClipboardJS(".share-button");
    clipboard.on("success", function(e) {
        console.log("Successfully copied", e.text)
        e.clearSelection()
    })
    clipboard.on("error", function(e) {
        console.log("Error while copying", e.text)
    })
}

function restore() {
    document.querySelectorAll(".selected").forEach(row => {row.classList.remove("selected")})
    window.history.pushState(null, null, "/documentation/content");
    onLocationChange()
}


function onLocationChange() {
    document.querySelectorAll(".tags")[0].innerHTML = document.querySelectorAll(".tags")[0].innerHTML = "<span><i class=\"color-blue fad fa-pencil-ruler\"></i> Filters: </span>"
    document.querySelectorAll(".is-hidden.row").forEach(row => {row.classList.remove("is-hidden")})
    if (getParameterByName("name")) {
        var found = false
        document.querySelectorAll(".tags")[0].innerHTML = document.querySelectorAll(".tags")[0].innerHTML = "<span><i class=\"color-blue fad fa-link\"></i> Results for: </span><span class=\"tag\"><i onclick=\"restore()\" class=\"fad fa-times-circle\"></i>" + getParameterByName("name").trim() + "</span>"
        document.querySelectorAll(".column:not(.is-one-fifth) .command-title").forEach(i => {
            if (i.innerText.replace("$", "").toLowerCase().trim() != getParameterByName("name").toLowerCase()) {
                i.parentElement.parentElement.parentElement.classList.add("is-hidden")
            } else {
                i.parentElement.parentElement.parentElement.classList.add("selected")
                found = true
            }
        })
        if (found == false) {
            // show error
        }
    } else if (getParameterByName("query")) {
        console.log("query found")
    } else if (getParameterByName("tags")) {
        var tags = getParameterByName("tags").split(",")
        tags.forEach(i => {
            document.querySelectorAll(".tags")[0].innerHTML = document.querySelectorAll(".tags")[0].innerHTML + "<span class=\"tag\"><i class=\"fad fa-times-circle\"></i>" + i + "</span>"
        })
        document.querySelectorAll(".is-one-fifth .command-title").forEach(i => {
            if (!tags.includes(i.innerText.trim())) {
                i.parentElement.parentElement.parentElement.classList.add("is-hidden")
            }

        })
    }
}




function initClickEvents() {
    var array = Array.from(document.querySelectorAll(".fa-caret-circle-down"))
    array = array.concat(Array.from(document.querySelectorAll(".row .columns .column:first-of-type")))

    array
        .forEach(i => {
            i.addEventListener("click", function() {
                var parent = i.parentElement.parentElement.parentElement
                if (i.parentElement.parentElement.classList.contains("row")) {
                    parent = i.parentElement.parentElement
                }
                if (parent.classList.contains("selected")) {
                    return parent.classList.remove("selected")
                }
                document.querySelectorAll(".selected").forEach(e => {
                    e.classList.remove("selected")
                })
                parent.classList.add("selected")
            })
        })

}

function getParameterByName(name, url) {
    if (!url) {url = window.location.href;}
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {return null;}
    if (!results[2]) {return "";}
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
