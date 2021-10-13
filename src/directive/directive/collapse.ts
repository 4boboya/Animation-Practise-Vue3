export const createCollapse = (app: any) => {
    app.directive('collapse', {
        mounted(el: HTMLElement, binding: any) {
            el.addEventListener('click', () => {
                const col = document.getElementById(binding.value) as HTMLElement
                if (col != undefined || col != null) {
                    if (col.style.height == '0px' || col.style.height == '') {
                        col.style.height = `${col.scrollHeight}px`
                    } else {
                        col.style.height = '0px'
                    }
                }
            })
        }
    })
}