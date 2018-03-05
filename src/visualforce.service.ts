import {Injectable, Optional} from '@angular/core';
import {NgRemote, RemoteResponse} from './ng-remote';
export interface RemoteAction {
    name: string;
    apexController?: string;
}
export class VisualforceConfig {
    apexController: string;
    buffer?: boolean;
    escape?: boolean;
    timeout?: number;
}

@Injectable()
export class VisualforceService {
    private _apexController: string;
    private _options;
    constructor(@Optional() config: VisualforceConfig) {
        if (config) {
            const {buffer, escape, timeout, apexController} = config;
            this._apexController = apexController;
            this._options = {buffer, escape, timeout};
        }
    }
    fetch(method: RemoteAction, ...params: any[]): Promise<RemoteResponse> {
        const {name, apexController} = method;
        if (this._apexController && !apexController) {
            if (this._options) {
                return new NgRemote(name, this._apexController, this._options).fetch(...params);
            }
            return new NgRemote(name, this._apexController).fetch(...params);
        }

        return new NgRemote(name, apexController).fetch(...params);
    }

}
