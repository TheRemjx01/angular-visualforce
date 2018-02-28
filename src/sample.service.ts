import { Injectable } from '@angular/core';
import {NgRemote, RemoteResponse} from "./ng-remote";

@Injectable()
export class NgRemoteService {
  fetch(method, ...params: any[]): Promise<RemoteResponse> {
      const {jsRemoteMethod, sfController} = method;
      return new NgRemote(jsRemoteMethod, sfController).fetch(...params);
  }
}
