function show_site(project, e) {

    // If ctrl or mobile then just open a new tab
    if (e != null && (e.ctrlKey || /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        window.open(project.url);
        return;
    }

    // Set background
    window.setTimeout (function() {
        document.getElementById("site-displayer").style["background-color"] = project.color;
        document.getElementById("site-displayer-graphics").classList.remove("invisible");
    }, 300);
    window.setTimeout (function() {
        document.getElementById("expanding").classList.remove("expanding");
    }, 1100);
    document.getElementById("expanding").classList.add("expanding");


    let siteDisplayer = document.getElementById("site-displayer");
    let clickCatcher = document.getElementById("background-click-catcher");
    siteDisplayer.classList.remove("invisible");
    clickCatcher.classList.remove("invisible");

    document.getElementById("site-displayer-graphics").classList.add("invisible");
    document.getElementById("site-displayer").style["background-color"] = "transparent";
    document.getElementById("expanding").style["background-color"] = project.color;
    document.getElementById("site-displayer-content").innerHTML = "<br>" + project.content + "<br>";

    // Change iframe src if it's not already loaded iframe.
    var iframe = document.getElementById("site-displayer-iframe");
    
    if (iframe != null && iframe.src == project.url) {
        iframe.style.opacity = "inherit";
        iframe.style.visibility = "inherit";
    } else {
        iframe = update_iframe(project.url);

        iframe.style.visibility = "hidden";
        iframe.style.opacity = "0";

        iframe.onload = function() {
            iframe.style.opacity = "inherit";
            iframe.style.visibility = "inherit";
        }
    }

    window.history.replaceState("", "Marshall Scott", "#" + project.id);
    document.body.style.overflow = "hidden";
    window.scrollTo(0,0)
}

function update_iframe(url) {
    var iframe = document.getElementById("site-displayer-iframe");
    if (iframe != null && iframe.url == url) { return iframe; }
    if (iframe != null) { iframe.remove(); }

    var iframe = document.createElement("iframe");
    iframe.id = "site-displayer-iframe";
    iframe.setAttribute("src", url);
    document.getElementById("site-displayer-graphics").getElementsByClassName("col-9")[0].appendChild(iframe);

    return iframe;
}

function hide_site() {
    let siteDisplayer = document.getElementById("site-displayer");
    let clickCatcher = document.getElementById("background-click-catcher");

    if (!siteDisplayer.classList.contains("invisible")) {
        siteDisplayer.classList.add("invisible");
    }
    if (!clickCatcher.classList.contains("invisible")) {
        clickCatcher.classList.add("invisible");
    }
    document.body.style.overflow = "inherit";
    window.history.replaceState("", "Marshall Scott", "/");
}

window.onload = function() {
    document.getElementById("background-click-catcher").onmousedown = hide_site;

    var slides = document.getElementsByClassName("project");
    
    for (var i = 0; i < projects.length; i++) {
        var slide = slides[i];
        var project = projects[i];

        var title = slide.getElementsByClassName("title")[0];
        
        if (title != null) {
            title.innerHTML = project.name;
            title.classList.remove("preloading");
        }
        title.style.color = project.color;

        var description = slide.getElementsByClassName("description")[0];
        if (description != null) {
            description.innerHTML = project.description;
            description.classList.remove("preloading");
        }

        // Generate tags
        var tags = slide.getElementsByClassName("tags")[0];
        for (var tag in project.tags) {
            tags.innerHTML += "<a class=\"tag\" style=\"background-color: " + project.color + ";\">" + project.tags[tag] + "</a>";
        }

        // Seperate into new function so, as project changes during the for loop so when the callback runs later we always open the last projects url
        (function(_proj, _slide) {
            _slide.onclick = function(i) {
                show_site(_proj, i);
            };

            // Load image
            let img = new Image();
            img.addEventListener("load", () => {
                _slide.getElementsByClassName("project-image")[0].style["background-image"] = "url("+_proj.image+")";
                _slide.getElementsByClassName("project-image")[0].classList.add("loaded");
            });
            img.src = _proj.image;
            
            // Listen to hovers on the project
            _slide.onmouseover = function() {
                if (document.getElementById("site-displayer-iframe") == null || document.getElementById("site-displayer-iframe").src != _proj.url) {
                    update_iframe(_proj.url);
                }
            };
        })(project, slide);
    }

    // Load project page on page load
    for (i in projects) {
        let project = projects[i];
        if ("#" + project.id == window.location.hash) {
            show_site(project);
        }
    }

    // Type name
    let name = "Marshall Scott";
    let typeName = function() {
        document.getElementById("title").textContent += name.substr(0, 1);
        name = name.substr(1, name.length - 1);
        if (name != "") {
            window.setTimeout (typeName, Math.random() * 250);
        } else {
            document.getElementById("title").style["padding-right"] = "10px";
        }
    };
    // Start typing name 500ms after load
    window.setTimeout (typeName, 500);

};


document.addEventListener("keydown", function(event) {
    const key = event.key; // Or const {key} = event; in ES6+
    if (key === "Escape") {
        hide_site();
    }
});