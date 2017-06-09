'use strict';

import { DomainEvent } from "serenity-js/lib/serenity/domain";
import { StageDesign } from "../screenPlay/StageDesign";

export class StageDesignChanging extends DomainEvent<StageDesign>{ }