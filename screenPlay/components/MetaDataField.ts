'use strict';

import { Question, UsesAbilities } from 'serenity-js/lib/screenplay-protractor';

export class MetaDataField implements Question<string> {
    static withValue = (metadataValue: string) => new MetaDataField(metadataValue);
    answeredBy = (actor: UsesAbilities) => Promise.resolve(this.value);
    toString = () => 'a meta data field';
    constructor(private value: string) { }
}