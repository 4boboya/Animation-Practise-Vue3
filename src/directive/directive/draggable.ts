export const createDraggable = (app: any) => {
    app.directive('draggable', {
        mounted(el: HTMLElement) {
            el.style.cursor = 'move';
            el.style.position = 'fixed';

            el.addEventListener('mousedown', (e: MouseEvent) => {
                const left = el.offsetLeft;
                const top = el.offsetTop;
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                document.onmousemove = (e) => {
                    const disX = e.clientX - mouseX;
                    const disY = e.clientY - mouseY;

                    el.style.left = `${left + disX}px`;
                    el.style.top = `${top + disY}px`;
                }

                // 监听鼠标抬起
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            });
        }
    })
}