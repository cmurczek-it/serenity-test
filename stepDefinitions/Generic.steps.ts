'use strict';

import cucumber = require('cucumber');
type Table = cucumber.TableDefinition

import { CustomWorld } from "../support/CustomWorld"
import { Start } from "../screenPlay/tasks/Start";
import { StageDesign } from "../screenPlay/StageDesign";

export = function steps() {

    this.Given(/^the following users$/, function (users: Table, callback) {
        StageDesign.create().toIntroduceCast(users.hashes());
        callback();
    });

    this.Given(/^(\w*\s\w*) is using DiFF$/, { timeout: 20 * 1000 }, function (actorName: string) {
        StageDesign.create().toAnnounceActor(actorName);
        return (this as CustomWorld).stage.theActorCalled(actorName).attemptsTo(
            Start.withAnEmptyWorkArea()
        );
    });
}