import {Channels} from "./Channels";
import {Dialog} from "./Dialog";
import {UserInfo} from "./UserInfo";
import {DialogList} from "./DialogList";

export class Application {
    Bootstrap() {
        const channels = [Channels, DialogList, UserInfo, Dialog];
        channels.forEach(function (c) {
            const component = new c();
            component.initialize();
            }
        )
    }
}
