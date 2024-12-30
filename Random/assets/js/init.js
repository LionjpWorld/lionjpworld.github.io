

var debounce = function () {
    var fns = {};
    return function (fn, interval) {
        var timer = fns[fn];
        if (fns[fn]) {
            clearTimeout(timer);
        }
        fns[fn] = setTimeout(fn, interval);
    }
}();

/* XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (_, url) {
    var result = this.originalOpen.apply(this, arguments);
    if (url && location.origin && !url.startsWith(location.origin)) {
        this.withCredentials = true;
    }
    return result;
}; */

var loaderContainer = document.querySelector('.loader-container');
var loaderProgress = document.querySelector('.loader-progress');

var gameContainer = document.querySelector('.game-container');
var gameContent = document.querySelector('.game-content');

var widthPadding = gameContainer.offsetWidth - gameContent.offsetWidth;
var heightPadding = gameContainer.offsetHeight - gameContent.offsetHeight;
var maxWidth = gameContainer.offsetWidth;
var maxHeight = gameContainer.offsetHeight;

onResize();
window.addEventListener("resize", debounce.bind(window, onResize, 200));

function progress(instance, progress) {
    if (instance.Module) {
        if (loaderProgress) {
            loaderProgress.innerText = Math.round(100 * progress) + "%";
        }
        if (progress == 1) {
            loaderContainer.remove();
            loaderContainer = undefined;
        }
    }
}
function onResize() {
    if (isMobileDevice()) {
        gameContainer.classList.add('mobile');
        if (loaderContainer) {
            if (window.innerWidth > window.innerHeight) {
                loaderContainer.classList.remove('vertical');
            } else {
                loaderContainer.classList.add('vertical');
            }
        }
    } else {
        if (loaderContainer) {
            loaderContainer.classList.remove('vertical');
        }
        gameContainer.classList.remove('mobile');
        var width = window.innerWidth;
        var height = window.innerHeight;
        gameContent.style.width = (width - widthPadding) + 'px';
        gameContent.style.height = (height - heightPadding) + 'px';
    }
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/.test(navigator.userAgent)
}
