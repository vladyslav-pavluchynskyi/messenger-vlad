import {Component} from "./Component";
import {createLi, renderElement, renderUl} from "../service";
import {getDialogList} from "../api";
import $ from "jqlite";
import AppContext from "./AppContext";

export class Channels extends Component{
    constructor() {
        super();
        this.data = null;
    }

    attachDOMEvents() {
        const li = $('li.dialog-item')
        li.on('click', function (e){
            let id = e.target.id;
            AppContext.events.dispatch('channelChanged', id);
        });
    }

   render() {
        if (this.data === null) {
            return;
        }

        const ul = renderUl('group');

        function renderProductList(element) {
            const li = createLi();
            li.setAttribute('id', element);
            li.setAttribute('class', 'dialog-item');
            const p = renderElement('p');
            p.setAttribute('id', element);
            li.append(p);
            ul.appendChild(li);
            p.innerHTML = p.innerHTML + element;
        }
       this.data.forEach(renderProductList);
       const elementsByClassName = document.getElementsByClassName('team-list');
       elementsByClassName[0].appendChild(ul);
       this.attachDOMEvents();
    }

   loadData() {
        getDialogList().then(({data: {dialogList}}) => {
            this.data = dialogList;
            this.render();
        });
    }

    initialize() {
        this.loadData()
    }


}
