window.dotnetify_blazor = {
    version: 0.1,
    addEventListener: function (elem, event, callbackHelper) {
        if (!(elem && typeof elem.addEventListener === 'function')) throw "Invalid ElementRef";
        elem.addEventListener(event, e => callbackHelper.invokeMethodAsync('Callback', e.detail));
    },
    dispatch: function (elem, state) {
        if (!(elem && elem.vm)) throw "ElementRef must reference 'd-vm-context'";
        elem.vm.$dispatch(JSON.parse(state));
    }
};