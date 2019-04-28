window.dotnetify_blazor = {
    version: 0.1,
    addEventListener: function (elem, event, callbackHelper) {
        elem.addEventListener(event, e => callbackHelper.invokeMethodAsync('Callback', e.detail).then(x => console.log(x)));
    }
};