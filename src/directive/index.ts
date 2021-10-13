import { createCollapse } from './directive/collapse'
import { createDraggable } from './directive/draggable';
import { createTooltip } from './directive/tooltip';

const createDirective = (app: any) => {
    createCollapse(app);
    createDraggable(app);
    createTooltip(app);
}
export default createDirective