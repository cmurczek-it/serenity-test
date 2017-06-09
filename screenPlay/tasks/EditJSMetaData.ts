'use strict';

import { PerformsTasks, Task } from "serenity-js/lib/screenplay";
import { Click, Duration, Enter, Is, step, Wait } from "serenity-js/lib/screenplay-protractor";

import { MetaDataEditDialog } from "../components/MetaDataEditDialog";

export class EditJSMetaData implements Task {
    static with(metaData: any) {
        return new EditJSMetaData(metaData.plantCode, metaData.assemblyStage, metaData.primaryPlanner);
    }

    constructor(private plantCode: number, private assemblyStage: string, private primaryPlanner: string) { }

    @step('{0} enters the meta data for the joining sequence')    
    performAs(actor: PerformsTasks): PromiseLike<void> {
        console.log('[cmu] task EditJSMetaData');
        return actor.attemptsTo(
            Enter.theValue(this.plantCode).into(MetaDataEditDialog.plantCodeInput),
            // TakeNote.of(MetaDataEditDialog.the_plant_code).as('the plant code'),
            Click.on(MetaDataEditDialog.submit),
            Wait.upTo(Duration.ofSeconds(5)).until(MetaDataEditDialog.submit, Is.invisible())
        );
    }
}