const position = [
    'top',
    'bottom',
    'right',
    'left',
    'topright',
    'bottomright',
    'topleft',
    'bottomleft',
    'righttop',
    'lefttop',
    'rightbottom',
    'leftbottom',
]

const event = [
    'focus',
    'hover',
    'focushover',
]

export const createTooltip = (app: any) => {
    app.directive('tooltip', {
        mounted(el: HTMLElement, binding: any) {
            el.setAttribute('tooltip', binding.value);
            el.setAttribute('position', 'top')
            el.setAttribute('event', 'focushover')
            Object.keys(binding.modifiers).forEach((item: any) => {
                if (position.includes(item)) {
                    el.setAttribute('position', item)
                }
                if (event.includes(item)) {
                    el.setAttribute('event', item)
                }
            })
        }
    })
}