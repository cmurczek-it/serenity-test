'use strict';

import { DomainEvent } from "serenity-js/lib/serenity/domain";
import { Stage, StageCrewMember } from "serenity-js/lib/serenity/stage";
import { Actor } from "serenity-js/lib/screenplay";
import { Execute, Target } from "serenity-js/lib/screenplay-protractor";
import { by } from "protractor";

import { StageDesign } from "./StageDesign";
import { StageDesignChanging } from "../support/StageDesignChanging";

export function setDesigner(): StageCrewMember {
    return SetDesigner.who(_ => _);
}

export class SetDesigner implements StageCrewMember {
    private static eventsOfInterest = [ StageDesignChanging ];
    stage: Stage;

    static who(designer: (design:StageDesign) => StageDesign ): SetDesigner {
        return designer(StageDesign.create()).build();
    }
    constructor() {
    }
    
    assignTo(stage: Stage) {
        this.stage = stage;
        this.stage.manager.registerInterestIn(SetDesigner.eventsOfInterest, this);
        StageDesign.create().setStageManager(stage.manager);
    }

    notifyOf(event: DomainEvent<any>): PromiseLike<any> {
        if (event.constructor.name === StageDesignChanging.name) {
            
            return this.setTheStage(this.stage.theActorInTheSpotlight());
        }
    }

    private setTheStage(actor: Actor): PromiseLike<any> {
        let stageDesign = StageDesign.create();
        return this.stage.manager.informOfWorkInProgress(
            Execute.asyncScript(stageDesign.instructions)
                .on(Target.the('application in the browser').located(by.id('diff_Root')))
                .withArguments(stageDesign.parameters)
                .performAs(actor)
                .then(() => {
                    stageDesign.instructions = null;
                    stageDesign.parameters = [];
                    stageDesign.stageReady();
                })
        );
    }
}