'use strict';

import { Target } from 'serenity-js/lib/screenplay-protractor';
import { by } from 'protractor';

export class Menu {
    static fileMenu = Target.the('"File" menu tab').located(by.id('tabContainer_tablist_tab.file'));
    static adminMenu = Target.the('"Admin" menu tab').located(by.id('tabContainer_tablist_tab.admin'));
}