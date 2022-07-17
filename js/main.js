function isMobile() {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Calls subfunctions that display a `project`. Where `e` is the event that may or may not have caused this action
function showSite(project, e) {
    console.log("showSite(" + project + "," + e + ")")

    // No site to show
    if (project.url == null) {
        return;
    }

    // If ctrl or mobile then just open a new tab
    if (e != null && (e.ctrlKey || isMobile())) {
        window.open(project.url).focus();
        return;
    }

    // Set background
    showSiteFrame(project.color);
    
    // Set styles based on project
    document.getElementById("site-displayer-graphics").classList.add("invisible");
    document.getElementById("site-displayer").style["background-color"] = "transparent";
    document.getElementById("expanding").style["background-color"] = project.color;
    document.getElementById("site-displayer-content").innerHTML = "<br>" + project.content + "<br>";

    // Updates
    updateSiteFrameIframe(project);

    // Change url
    window.history.replaceState("", "Marshall Scott", "#" + project.id);

    // Stop scrolling
    document.documentElement.style.overflowY = "hidden";
}

function updateSiteFrameIframe(project) {
    console.log("updateSiteFrameIframe(" + project + ")")
    // Change iframe src if it's not already loaded iframe.
    var iframe = document.getElementById("site-displayer-iframe");

    if (iframe != null && iframe.src === project.url) {
        // Show it visibly
        iframe.style.opacity = "inherit";
        iframe.style.visibility = "inherit";
    } else {
        // Start 
        iframe = updateIFrame(project.url);

        iframe.style.visibility = "hidden";
        iframe.style.opacity = "0";

        iframe.onload = function() {
            iframe.style.opacity = "inherit";
            iframe.style.visibility = "inherit";
        }
    }
}

function showSiteFrame(color) {
    let siteDisplayer = document.getElementById("site-displayer");
    let clickCatcher = document.getElementById("background-click-catcher");
    siteDisplayer.classList.remove("invisible");
    clickCatcher.classList.remove("invisible");

    showSiteFrameContent(color);
}

// Makes the site div content visible on the screen
function showSiteFrameContent(color) {
    console.log("showSiteFrameContent(" + color + ")")
    // Schedule the div vto get styled and contents visible.
    window.setTimeout (function() {
        document.getElementById("site-displayer").style["background-color"] = color;
        document.getElementById("site-displayer-graphics").classList.remove("invisible");
    }, 300);

    // Stop expanding animation
    window.setTimeout (function() {
        document.getElementById("expanding").classList.remove("expanding");
    }, 1100);

    // Start expanding
    document.getElementById("expanding").classList.add("expanding");
}

// Update the iframes src
function updateIFrame(url) {
    console.log("updateIFrame(" + url + ")")
    var iframe = document.getElementById("site-displayer-iframe");
    if (iframe != null && iframe.url === url) { return iframe; }
    if (iframe != null) { iframe.remove(); }

    var iframe = document.createElement("iframe");
    iframe.id = "site-displayer-iframe";
    iframe.setAttribute("src", url);
    document.getElementById("site-displayer-graphics").getElementsByClassName("col-9")[0].appendChild(iframe);

    return iframe;
}

function hideSite() {
    console.log("hideSite()")
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
    document.documentElement.style.overflowY = "auto";
}

function loadVideo(slide, project) {
    console.log("loadVideo(" + slide + ", " + project + ")")
    // Disable video for mobile clients
    if (isMobile()) {
        project.video = null;
    }

    if (project.video != null) {
        let video = slide.getElementsByClassName("video")[0];

        // Get width and height
        let width = video.offsetWidth;
        let height = video.offsetHeight;

        let resolution = null;

        for (let i in project.video_sizes) {
            let res = project.video_sizes[i];

            if (res[0] > width && res[1] > height) {
                resolution = res;
                break;
            }
        }

        // Pick biggest
        if (resolution == null) {
            resolution = project.video_sizes[project.video_sizes.length - 1];
        }

        video.src = project.video + "_" + resolution[0] + "x" + resolution[1] + ".mp4";
        //video.width = resolution[0];
        //video.height = resolution[1];

        // Make video centered
        let playerSize = video.parentElement.clientHeight - video.parentElement;
        video.style["margin-top"] = playerSize + 'px';

        slide.addEventListener("mouseenter", function() {
            video.play();
        });
        
        slide.addEventListener("mouseleave", function() {
            video.pause();
        });
    }
}

window.onload = function() {
    // Setup the on load click catcher
    document.getElementById("background-click-catcher").onmousedown = hideSite;

    // Loop over all slides
    var slides = document.getElementsByClassName("project");
    
    for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        var project = projects[i];

        loadVideo(slide, project);

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
        if (tags != null) {
            for (var tag in project.tags) {
                tags.innerHTML += "<a class=\"tag\" style=\"background-color: " + project.color + ";\">" + project.tags[tag] + "</a>";
            }
        }

        // Seperate into new function so, as project changes during the for loop so when the callback runs later we always open the last projects url
        (function(_proj, _slide) {
            _slide.onclick = function(i) {
                showSite(_proj, i);
            };

            // Load image
            let img = new Image();
            img.addEventListener("load", () => {
                _slide.getElementsByClassName("project-image")[0].style["background-image"] = "url("+ _proj.image +")";
                _slide.getElementsByClassName("project-image")[0].classList.add("loaded");
            });
            img.src = _proj.image;
            
            // Listen to hovers on the project
            _slide.onmouseover = function() {
                if (document.getElementById("site-displayer-iframe") == null || document.getElementById("site-displayer-iframe").src != _proj.url) {
                    updateIFrame(_proj.url);
                }
            };
        })(project, slide);
    }

    // Load project page on page load if url specifies
    for (i in projects) {
        let project = projects[i];
        if ("#" + project.id === window.location.hash) {
            console.log(project)
            showSite(project);
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
            document.getElementById("title").style["border-right"] = "none";
        }
    };
    // Start typing name 500ms after load
    window.setTimeout (typeName, 500);

};


document.addEventListener("keydown", function(event) {
    const key = event.key; // Or const {key} = event; in ES6+
    if (key === "Escape") {
        hideSite();
    }
});