'use strict';

import { PerformsTasks, Task } from "serenity-js/lib/screenplay";
import { Click, Duration, Is, step, Wait } from "serenity-js/lib/screenplay-protractor";

import { AdminMenu } from "../components/AdminMenu";
import { FileMenu } from "../components/FileMenu";
import { Menu } from "../components/Menu";
import { MetaDataEditDialog } from "../components/MetaDataEditDialog"
import { EditJSMetaData } from "../tasks/EditJSMetaData";

export class CreateAJoiningSequence implements Task {
    static with(metaData: any) {
        return new CreateAJoiningSequence(metaData);
    }

    constructor(private metaData: any) {

    }

    @step('{0} creates a new joining sequence')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        console.log('[cmu] task CreateAJoiningSequence');
        return actor.attemptsTo(
            Click.on(Menu.fileMenu),
            Click.on(FileMenu.newJoiningSequence),
            Wait.upTo(Duration.ofSeconds(5)).until(MetaDataEditDialog.plantCodeInput, Is.visible()),
            EditJSMetaData.with(this.metaData),
            Wait.upTo(Duration.ofSeconds(5)).until(AdminMenu.metaData, Is.visible())
        );
    }
}