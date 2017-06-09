'use strict';

import { expect } from "chai";
import cucumber = require('cucumber');
// import { CompareNotes } from 'serenity-js/lib/screenplay-protractor';

import { CustomWorld } from "../support/CustomWorld";
import { StageDesign } from "../screenPlay/StageDesign";
import { CreateAJoiningSequence } from "../screenPlay/tasks/CreateAJoiningSequence";
import { ReviewMetaData } from "../screenPlay/tasks/ReviewMetaData";
import { MetaDataEditDialog } from "../screenPlay/components/MetaDataEditDialog"

type Table = cucumber.TableDefinition;

export = function steps() {

  const equals = <T>(expected: T) => (actual: T) => expect(actual).to.eventually.equal(expected);

  this.When(/^s?he creates a new joining sequence with the following metadata$/, function (table: Table) {
    return StageDesign.create().forANewJoiningSequence().then(() => {
      return (this as CustomWorld).stage.theActorInTheSpotlight().attemptsTo(
        CreateAJoiningSequence.with(table.rowsHash())
      );
    });
  });

  this.Then(/^s?he can see the (?:entered|selected) (\w*\s\w*) in the metadata$/, function (metadataField: string) {
    return (this as CustomWorld).stage.theActorInTheSpotlight().attemptsTo(
        ReviewMetaData.ofTheJoiningSequence()
        // , CompareNotes.toSeeIf(MetaDataEditDialog.the_plant_code, equals, 'the plant code')
    )
  });
}