import {Component} from "./Component";
import {createDiv, createLi, createSpan, setPhoto} from "../service";
import AppContext from "./AppContext";
import {getMessageList} from "../api";
import $ from "jqlite";

export class DialogList extends Component {
    constructor() {
        super();
        this.messageList = null;
    }

    initialize() {
        AppContext.events.addListener('channelChanged', (id) => { this.onChannelChanged(id) });
    }

    onChannelChanged(channelId) {
        getMessageList(...channelId)
            .then(({data: {messageList}}) => {
            this.messageList = messageList;
            this.render();
        })
    }

    attachDOMEvents() {
        const li = $('li.person')
        li.on('click', function (e){
            let id = e.path.find(({localName}) => localName==='li').id;
            AppContext.events.dispatch('personChange', id);
        });
    }

    render() {
        if (!this.messageList) {
            return;
        }

        const ul = document.createElement('ul');

        function renderPerson(element) {
            const li = createLi('person');
            li.setAttribute('id',  element.name)
            const span = createSpan(`${element.status} photo`);
            setPhoto(span, element.photo);
            const text = createDiv('text');
            const insideMain = createDiv('inside');
            const insideTime = createDiv('inside');
            const name = createSpan('name');
            const message = createSpan('small-grey-text message-three-point-end');
            const menu = createSpan('menu');
            menu.setAttribute('class', 'menu');
            menu.innerHTML = menu.innerHTML + '...';
            const time = createSpan('small-grey-text left-mar-9');

            name.innerHTML = name.innerHTML + element.name;
            message.innerHTML = message.innerHTML + element.lastMessage.message;
            time.innerHTML = time.innerHTML + element.lastMessage.time;
            insideMain.append(name);
            insideMain.append(message);
            insideTime.append(menu);
            insideTime.append(time);
            text.append(insideMain);
            text.append(insideTime);
            li.append(span);
            li.append(text);
            ul.appendChild(li);
            const personals = document.getElementsByClassName('personals');
            const personal = personals[0];
            personal.innerHTML = '';
            personal.appendChild(ul);
            ul.children[0].click();
        }

        this.messageList.forEach(renderPerson);
        this.attachDOMEvents();
    }
}
