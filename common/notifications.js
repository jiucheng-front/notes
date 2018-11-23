var header = document.getElementById('title');
var count = getCount();
var title = document.title.replace(/s$/, '');

updateCount(count);
try {
    window.addEventListener('storage', onStorageChange);
} catch (e) {
    window.attachEvent('onstorage', onStorageChange);
}

function updateCount(n) {
    var s = n === 1 ? '' : 's';
    var t = header.innerHTML = document.title = n + ' ' + title + s;
    if (frameElement) { // for bl.ocks.org's parent frame
        parent.document.title = t;
        frameElement.style.height = '125px';
    }
}/*  */

function getCount() {
    return JSON.parse(localStorage.unseenNotificationCount || '0');
}

function setCount(n) {
    localStorage.unseenNotificationCount = JSON.stringify(n || 0);
    return count = n;
}

function onStorageChange(e) {
    if (e.key !== 'unseenNotificationCount') return;
    var v = e.newValue;
    console.log(v)
    updateCount(v);
    try {
        var t = (new Date(e.timeStamp)).toISOString();
        console.log('%s: %s = %s', t, e.key, v);
    } catch (e) {}
}

document.body.addEventListener('click', function(e) {
    switch (e.target.id) {
        case 'clr':
            return updateCount(setCount(0));
        case 'add':
            return updateCount(setCount(1 + getCount()));
    }
});