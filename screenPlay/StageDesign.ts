'use strict';

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { StageManager } from "serenity-js/lib/serenity/stage";
import { DomainEvent } from "serenity-js/lib/serenity/domain";

import { SetDesigner } from "./SetDesigner";
import { StageDesignChanging } from "../support/StageDesignChanging";

export class StageDesign {

    private static instance: StageDesign;

    private resolvePromise: any;

    static create(): StageDesign{
        if (!StageDesign.instance) {
            StageDesign.instance = new StageDesign();
        }
        return StageDesign.instance;
    }
    private constructor() { 
        this.parameters = [];
    }

    private stageManager: StageManager;
    private instr: string;
    
    setStageManager(stageManager: StageManager) {
        this.stageManager = stageManager;
    }

    get instructions(): string {
        return this.instr;
    }
    set instructions(newInstructions: string) {
        this.instr = newInstructions;
        if (this.instr) {
            this.stageManager.notifyOf(new StageDesignChanging(this, Date.now()));
        }
    }
    
    build(): SetDesigner {
        return new SetDesigner();
    }

    parameters: string[];    

    private cast: any;    

    stageReady(): void {
        this.resolvePromise();
    }

    toIntroduceCast(users: any): void {
        const originalIndexHtml = fs.readFileSync('./index.html', 'utf8');
        this.cast = users.map(user => {
            user.roles = [user.roles];
            return user;
        });
        const responseBody = JSON.stringify(this.cast);
        const $ = cheerio.load(originalIndexHtml);
        const castScript = '    <script id="cast">\n' +
                           '        window.mockBackend.respondWith(/\\/web\\/api\\/masterData\\/planners\\//, [\n' +
                           '            200,\n' +
                           `            { "Content-Language": "de-DE", "Content-Type": "application/json", "Content-Length": ${responseBody.length} },\n` +
                           `         '${responseBody}'\n` +
                           '        ]);\n' +
                           '    </script>\n';
        $(castScript).insertAfter('#mockbackend');
        fs.writeFileSync('./index.html', $.html(), { encoding: 'utf8' });
    }

    toAnnounceActor(userName: string): void {
        const indexHtml = fs.readFileSync('./index.html', 'utf8');
        const responseBody = JSON.stringify(this.cast.find(u => u.name === userName));
        const $ = cheerio.load(indexHtml);
        const script = '<script id="user">' +
                       '        window.mockBackend.respondWith(/\\/web\\/api\\/user/, [\n' +
                       '            200,\n' +
                       `            { "Content-Language": "de-DE", "Content-Type": "application/json", "Content-Length": ${responseBody.length} },\n` +
                       `            '${responseBody}'\n` +
                       '        ]);\n' +                            
                       '    </script>\n';
        $(script).insertAfter('#cast');
        fs.writeFileSync('./index.html', $.html(), { encoding: 'utf8' });
    }

    forANewJoiningSequence(): PromiseLike<void> {
        return new Promise <void>(resolve => {
            this.resolvePromise = resolve;
            this.parameters.push(fs.readFileSync('./testui/testData/newJS_PlantNameOnly.json', 'utf-8'));
            this.instructions = 'var callback = arguments[arguments.length-1];\n' +
                this.POST_A_NEW_JS +
                this.GET_A_JS +
                this.AUTOSAVE_A_JS +
                this.TURN_ON_EDIT_MODE +
                '\ncallback();';
        });
    }

    private POST_A_NEW_JS = 'window.mockBackend.respondWith("POST", /\\/web\\/api\\/joiningSequences\\/$/, function (xhr) {\n' +
            '    var joiningSequenceDto = JSON.parse(xhr.requestBody);\n' +
            '    xhr.respond(200, { "Content-Language": "de-DE" }, "");\n' +
            '});\n'
    
    private AUTOSAVE_A_JS = 'window.mockBackend.respondWith("PUT", /\\/web\\/api\\/joiningSequences\\/([\\w,-]*)/, [\n' +
            '    200,\n' +
            '    { "Content-Type": "application/json", "Content-Language": "de-DE", "Content-Length": 34 },\n' +
            '    \'{"errorCode":0,"status":"success"}\'\n' +
            ']);'
    
    private GET_A_JS = 'window.mockBackend.respondWith("GET", /\\/web\\/api\\/joiningSequences\\/([\\w,-]*)$/, function (xhr, id) {\n' +
            '    var joiningSequenceDto = JSON.parse(arguments[1]);\n' +
            '    var now = Date.now();\n' +
            '    joiningSequenceDto.joiningSequence.created = now;\n' +
            '    joiningSequenceDto.joiningSequence.modified = now;\n' +
            '    joiningSequenceDto.joiningSequence.uuid = id;\n' +
            '    var body = JSON.stringify(joiningSequenceDto, function (key, value) {\n' +
            '        if (key === "jsUuid") {\n' +
            '            return id;\n' +
            '        } else {\n' +
            '            return value;\n' +
            '        }\n' +
            '    });\n' +
            '    xhr.respond(200,\n' +
            '        { "Content-Type": "application/json", "Content-Language": "de-DE", "Content-Length": body.length },\n' +
            '        body\n' +
            '    );\n' +
            '});\n'
            
    private TURN_ON_EDIT_MODE = 'window.mockBackend.respondWith("POST", /\\/web\\/api\\/joiningSequences\\/([\\w,-]*)\\/writeLock$/, [\n' +
            '    200,\n' +
            '    { "Content-Type": "application/json", "Content-Language": "de-DE", "Content-Length": 65 },\n' +
            '    \'{"token":"f41fab4a-ae1a-4965-894e-19434fdc452f","user":"Planner"}\'\n' +
            ']);\n'
}