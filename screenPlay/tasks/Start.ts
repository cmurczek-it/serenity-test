'use strict';

import { browser } from "protractor";
import { PerformsTasks, Task } from "serenity-js/lib/screenplay";
import { Is, Duration, Open, step, UseAngular, Wait } from "serenity-js/lib/screenplay-protractor";

import { Menu } from "../components/Menu";

export class Start implements Task {
    static withAnEmptyWorkArea() {
        return new Start();
    }

    @step('{0} starts DiFF')    
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            UseAngular.disableSynchronisation(),
            Open.browserOn(browser.baseUrl),
            Wait.upTo(Duration.ofSeconds(20)).until(Menu.fileMenu, Is.visible())
        );
    }
}