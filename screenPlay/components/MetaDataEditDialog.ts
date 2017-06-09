'use strict';

import { Target, Text } from 'serenity-js/lib/screenplay-protractor';
import { by } from 'protractor';

export class MetaDataEditDialog {
    static plantCodeInput = Target.the('"plant code" input field').located(by.id('masterDataPlant'));
    static assemblyStage = Target.the('"assembly stage" input field').located(by.id('masterDataAssemblyStage'));
    static submit = Target.the('"OK" button').located(by.id('metaDataEditDialogSubmit'));
    static cancel = Target.the('"Cancel" button').located(by.id('metaDataEditDialogCancel'));

    static the_plant_code = Text.of(MetaDataEditDialog.plantCodeInput);
}