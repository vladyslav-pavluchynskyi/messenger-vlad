import {createDiv, createLi, createSpan, removeClick, setPhoto} from "./service";
import {clicked} from "./constants";
import {PersonalInfo} from "./PersonalInfo";
import {Messages} from "./Messages";

export class ChannelItems {

    constructor(personList) {
        this.personList = personList;
    }

    renderDialog() {
        const ul = document.createElement('ul');

        function renderPerson(element) {
            const userInfo = {photo: element.photo, name: element.name, ...element.userInfo};
            const li = createLi();
            li.onclick = function () {
                removeClick(clicked);
                li.classList.add(clicked);
                const personalInfo = new PersonalInfo(userInfo);
                personalInfo.render();
                const messages = new Messages(element.messages, element.photo);
                messages.render();
            }

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
        }

        this.personList.forEach(renderPerson);
    }
}
