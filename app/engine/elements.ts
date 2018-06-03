var $ = require("jquery");

export class GameElements {
    public static get ClickerButton(): JQuery 
    {
        return $("#clicker");
    }

    public static get Count(): JQuery
    { 
        return $("#count")
    }

    public static get Save(): JQuery {
        return $("#save");
    }

    public static get Load(): JQuery {
        return $("#load");
    }
}