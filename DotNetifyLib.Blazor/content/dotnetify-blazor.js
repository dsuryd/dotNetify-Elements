dotnetify_blazor = {
    version: 0.1,
    _eventListeners: [],
    addEventListener: function (event, elem, callbackHelper) {
        if (typeof elem === 'string') elem = document.querySelector(elem);
        if (!(elem && typeof elem.addEventListener === 'function')) throw "Cannot listen to event '" + event + "': invalid ElementRef";
        const callback = e => callbackHelper.invokeMethodAsync('Callback', e.detail);
        if (!dotnetify_blazor._eventListeners.some(x => x.elem === elem && x.event === event)) {
            dotnetify_blazor._eventListeners.push({ elem, event, callback });
            elem.addEventListener(event, callback);
        }
    },
    dispatch: function (elem, state) {
        if (!(elem && elem.vm)) throw "ElementRef must reference 'd-vm-context'";
        elem.vm.$dispatch(JSON.parse(state));
    },
    removeAllEventListeners: function (elem) {
        dotnetify_blazor._eventListeners.filter(x => x.elem === elem).forEach(x => elem.removeEventListener(x.event, x.callback));
        dotnetify_blazor._eventListeners = dotnetify_blazor._eventListeners.filter(x => x.elem !== elem);
    }
};