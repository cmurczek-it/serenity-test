'use strict';
import { serenity } from "serenity-js";

import { DiFFUsers } from "../screenPlay/DiFFUsers";

export = function () {
    this.setDefaultTimeout(10 * 1000);

    this.World = function () {
        this.stage = serenity.callToStageFor(new DiFFUsers());
    }
}
