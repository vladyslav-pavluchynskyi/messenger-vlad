import {createDiv, createSpan, setPhoto} from "./service";

export class PersonalInfo {
    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    render() {

        function row(className, rowName, rowInfo) {
            const container = createDiv(className);
            const whiteText = createSpan(`white-text`);
            const greyText = createSpan(`grey-text`);
            greyText.innerHTML = greyText.innerHTML + rowName;
            whiteText.innerHTML = whiteText.innerHTML + rowInfo;
            container.append(greyText);
            container.append(whiteText);
            return container;
        }

        const topUserInfo = createDiv(`top-user-info`);
        const registerInfo = createDiv(`register-info`);
        const personalData = createDiv(`personal-data`);
        const userContainer = createDiv(`user-container`);
        const city = createSpan(`grey-text`);
        const name = createSpan(`white-text`);
        const photo = createSpan(`photo`);
        name.innerHTML = name.innerHTML + this.userInfo.name;
        city.innerHTML = city.innerHTML + this.userInfo.city;
        setPhoto(photo, this.userInfo.photo);
        userContainer.append(photo);
        userContainer.append(name);
        userContainer.append(city);
        topUserInfo.append(userContainer);
        registerInfo.append(row('nickname', 'Nickname', this.userInfo.nickName));
        registerInfo.append(row('email', 'Email', this.userInfo.email));
        registerInfo.append(row('phone-number', 'Phone number', this.userInfo.phone));

        personalData.append(row('date-of-birth', 'Date of birth', this.userInfo.dob));
        personalData.append(row('gender', 'Gender', this.userInfo.gender));
        personalData.append(row('languages', 'Languages', this.userInfo.languages));
        const green = createSpan(`green-text`);
        green.innerHTML = green.innerHTML + 'Show full profile';


        personalData.append(green);
        const personals = document.getElementsByClassName('user-info');
        const personal = personals[0];
        personal.innerHTML = '';
        personal.appendChild(topUserInfo);
        personal.appendChild(registerInfo);
        personal.appendChild(personalData);
    }
}
