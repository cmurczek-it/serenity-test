'use strict';
import { browser } from "protractor";
import { Actor, BrowseTheWeb, Cast } from "serenity-js/lib/screenplay-protractor";

export class DiFFUsers implements Cast { 
    actor(name: string): Actor {
        return Actor.named(name).whoCan(
            BrowseTheWeb.using(browser)
            // ,TakeNotes.usingAnEmptyNotepad()
        );
    }
}
