import {Component} from "./Component";
import {renderElement, setPhoto} from "../service";
import {ME, OPPONENT} from "../constants";
import {getDialog} from "../api";
import AppContext from "./AppContext";

export class Dialog extends Component {

    constructor() {
        super();
        this.dialog = null;
    }

    initialize() {
        AppContext.events.addListener('personChange', (id) => {
            this.onChannelChanged(id)
        });
    }

    onChannelChanged() {
        getDialog().then(({data: {dialog}}) => {
            this.dialog =dialog;
            this.render();
        });
    }

    render() {
        if (!this.dialog) {
            return;
        }
        this.renderMessages();
    }

    renderMessages() {
        function photoSet(message, photoImgUrl) {
            const photoElement = renderElement('span', 'photo');
            setPhoto(photoElement, photoImgUrl)
            return photoElement;
        }

        function messageArea(message) {
            const mess = renderElement('span', 'message');
            const myMessageArea = renderElement('div', 'my-message-area');
            mess.innerHTML = mess.innerHTML + message.message;
            myMessageArea.append(mess);
            return myMessageArea
        }

        function getTime(message, prefix) {
            const timeView = renderElement('span', `time ${prefix}`);
            timeView.innerHTML = timeView.innerHTML + message.time;
            return timeView;
        }

        function simpleMessageContainer(mesPhoto, time1, prefix) {
            const simpleMessageMy = renderElement('div', `${prefix} replica simple-message`);
            const contentOfMessage = renderElement('div', 'content-message');
            contentOfMessage.append(mesPhoto);
            contentOfMessage.append(time1);
            simpleMessageMy.append(contentOfMessage);
            return simpleMessageMy;
        }

        function renderMyMessage(message, messageAndPhoto, photo, myMessageArea) {
            messageAndPhoto.append(myMessageArea);
            messageAndPhoto.append(photo);
            const timeView = getTime(message, 'right');
            return simpleMessageContainer(messageAndPhoto, timeView, 'my');
        }


        function renderOpponentMessage(message, messageAndPhoto, photo, messageArea) {
            messageAndPhoto.append(photo);
            messageAndPhoto.append(messageArea);
            const timeView = getTime(message, 'left');
            return simpleMessageContainer(messageAndPhoto, timeView, OPPONENT);
        }

        function renderMessage(message, opPhoto, myPhoto) {
            const messageAndPhoto = renderElement('div', 'message-photo');
            const myMessageArea = messageArea(message);
            if (message.sender === ME) {
                const photo = photoSet(message, myPhoto);
                return renderMyMessage(message, messageAndPhoto,
                    photo,
                    myMessageArea);
            } else {
                const photo = photoSet(message, opPhoto);
                return renderOpponentMessage(message, messageAndPhoto,
                    photo,
                    myMessageArea);
            }
        }

        const messagesElement = document.getElementsByClassName('messages');
        const mes = messagesElement[0];
        mes.innerHTML = '';

        const {opponentPhoto, photo, messages} = this.dialog;
        messages.forEach(function (message) {
            const messages = renderMessage(message, opponentPhoto, photo);
            mes.appendChild(messages);
        });
    }
}
