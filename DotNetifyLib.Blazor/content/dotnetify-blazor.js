dotnetify_blazor = {
    version: 0.1,
    _eventListeners: [],
    addEventListener: function (elem, event, callbackHelper) {
        if (!(elem && typeof elem.addEventListener === 'function')) throw "Invalid ElementRef";
        const callback = e => callbackHelper.invokeMethodAsync('Callback', e.detail);
        dotnetify_blazor._eventListeners.push({ elem, event, callback });
        elem.addEventListener(event, callback);
    },
    dispatch: function (elem, state) {
        if (!(elem && elem.vm)) throw "ElementRef must reference 'd-vm-context'";
        elem.vm.$dispatch(JSON.parse(state));
    },
    destroy: function (elem) {
        if (!(elem && elem.vm)) throw "ElementRef must reference 'd-vm-context'";
        elem.vm.$destroy();
        dotnetify_blazor._eventListeners.filter(x => x.elem === elem).forEach(x => elem.removeEventListener(x.event, x.callback));
        dotnetify_blazor._eventListeners = dotnetify_blazor._eventListeners.filter(x => x.elem !== elem);
    }
};