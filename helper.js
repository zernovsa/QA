import {t, Selector} from 'testcafe';
import {username, password} from './config.js';

export async function getClick (t) {
    await t.click('.new-btn');
}

export const login = async () => {
    await t
    //.navigateTo(`https://ca1.webdev.uiscom.ru`)
        .typeText('input[name="login"]', username)
        .typeText('input[name="password"]', password)
        .pressKey('enter')
}

export function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const addSite = async () => {

}
