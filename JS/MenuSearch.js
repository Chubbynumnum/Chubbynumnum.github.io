document.onscroll = function () {
    if (window.scrollY > 25) {
        document.body.classList.add('scrolled');
    }
    else {
        if (hasClass(document.body, 'scrolled')) {
            document.body.classList.remove('scrolled');
        }
    }
}
document.onclick = function (e) {
    let resultOne = 0;
    let resultTWO = 0;
    let parentElement = document.getElementById("gs-search");
    let x = parentElement.childElementCount;
    for (let i = 0; i < x; i++) {
        if (e.target.id == parentElement.childNodes[i].id) {
            resultOne = 1;
            break;
        }
    }

    if (hasClass(document.body, 'search-typing')) {
        resultTWO = 1;
    }

    if (resultOne == 1 && resultTWO == 1) {
        document.body.classList.remove('search-open');
    }

}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

document.getElementById("searchInputIcon").onclick = function () {
    document.body.classList.add('search-open');
    document.getElementById("gs-header-search-box-input").focus();
}

document.getElementById("CloseSearch").onclick = function () {
    document.body.classList.remove('search-open', 'search-typing');
    document.getElementById("gs-header-search-box-input").value = "";
    if (hasClass(document.body, 'search-home')) {
        var inputElement = document.getElementById("gs-header-search-box-input");
        inputElement.onkeyup.call();
        addQueryParam('q', inputElement.value);
    }
}


document.getElementById("IconBackSpace").onclick = function () {
    var inputElement = document.getElementById("gs-header-search-box-input");
    inputElement.value = "";
    inputElement.focus();
    inputElement.onkeyup.call();
    addQueryParam('q', "");
    
}

document.getElementById("gs-header-search-box-input").onkeyup = function () {
    if (this.value) {
        document.body.classList.add('search-typing', 'search-home');
        document.body.classList.remove('search-backdrop');
    }
    else {
        document.body.classList.remove('search-typing');
    }
}

document.getElementById("gs-header-search-box-input").oninput = function () {
    if (this.value && hasClass(document.body, 'search-backdrop')) {
        document.getElementById('gs-search-form').submit();
    }
    else {
        addQueryParam('q', this.value);
    }
}

const addQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
    dispatchEvent(eventUrlChange);
};

const getQueryParam = (key) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(key) || '';
};
const eventUrlChange = new Event("URLChange");

window.addEventListener("load", (event) => {
    var field = 'q';
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1 && url.indexOf('=') != url.length - 1) {
        //search
        //document.body.classList.add('search-open', 'search-typing');
        var inputElement = document.getElementById("gs-header-search-box-input");
        inputElement.value = getQueryParam('q');
        inputElement.focus();
    }
    else if (url.indexOf('&' + field + '=') != -1 && url.indexOf('=') != url.length - 1) {
        //search
        //document.body.classList.add('search-open', 'search-typing');
        var inputElement = document.getElementById("gs-header-search-box-input");
        inputElement.value = getQueryParam('q');
        inputElement.focus();
    }
    else {
        document.body.classList.remove('search-open', 'search-typing');
    }
})
