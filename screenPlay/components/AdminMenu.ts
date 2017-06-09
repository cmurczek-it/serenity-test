'use strict';

import { Target } from 'serenity-js/lib/screenplay-protractor';
import { by } from 'protractor';

export class AdminMenu {
    static metaData = Target.the('"metadata" button').located(by.id('toolbar.admin.editMaster'));
}