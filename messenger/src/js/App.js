import {firstPersonList, secondPersonList} from "./data";
import {createLi, removeClick, renderElement, renderUl} from "./service";
import {active} from "./constants";
import {ChannelItems} from "./ChannelItems";

export default class App {
    constructor() {
        this.teamListObjects = [
            {
                name: 'First',
                item: firstPersonList
            },
            {
                name: 'Second',
                item: secondPersonList
            }
        ];
    }

    render() {
        const ul = renderUl('group');
        function renderProductList(element) {
            const li = createLi();
            const p = renderElement('p');
            li.append(p);
            ul.appendChild(li);
            li.onclick = function () {
                removeClick(active);
                const channelItems = new ChannelItems(element.item);
                channelItems.renderDialog();
                li.classList.add(active);
            }
            p.innerHTML = p.innerHTML + element.name;
        }

        this.teamListObjects.forEach(renderProductList);


        const elementsByClassName = document.getElementsByClassName('team-list');
        elementsByClassName[0].appendChild(ul);
        ul.children[0].click();
    }

}




