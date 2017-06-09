'use strict';

import { Target } from 'serenity-js/lib/screenplay-protractor';
import { by } from 'protractor';

export class FileMenu {
    static newJoiningSequence = Target.the('"New Joining Sequence" button').located(by.id('toolbar.file.newFF'))
}