import {GameElements} from './elements';

GameElements.ClickerButton.click((e) => {
    let currentValue = parseInt(GameElements.Count.text());
    currentValue = currentValue + 1;
    GameElements.Count.html(currentValue.toString());
});