'use strict';

import { PerformsTasks, Task } from "serenity-js/lib/screenplay";
import { Click, Is, step, Wait } from "serenity-js/lib/screenplay-protractor";

import { Menu } from "../components/Menu";
import { AdminMenu } from "../components/AdminMenu";

export class ReviewMetaData implements Task {
    static ofTheJoiningSequence() {
        return new ReviewMetaData();
    }

    constructor() { }

    @step('{0} reviews the meta data of the joining sequence')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Click.on(Menu.adminMenu),
            Click.on(AdminMenu.metaData)
        );
    }
}