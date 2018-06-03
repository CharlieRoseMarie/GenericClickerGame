import {GameElements} from './elements';
import { parse } from 'querystring';
var $ = require('jquery');

GameElements.ClickerButton.click((e) => {
    let currentValue = parseInt(GameElements.Count.text());
    currentValue = currentValue + 1;
    GameElements.Count.html(currentValue.toString());
});

GameElements.Save.click((e) => {
    let currentValue = parseInt(GameElements.Count.text());
    localStorage.setItem("count", currentValue.toString());
});

GameElements.Load.click((e) => {
    let storage = localStorage.getItem("count");
    if(storage != null) {
        let oldValue = parseInt(storage);
        GameElements.Count.html(oldValue.toString());
    }
});