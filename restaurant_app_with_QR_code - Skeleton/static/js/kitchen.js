var timeout = 15000;

window.setTimeout(poller, timeout);

function poller() {
    window.location = "https://seanko.pythonanywhere.com/7";

    window.setTimeout(poller, timeout);
}
