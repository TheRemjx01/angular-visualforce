declare var Visualforce: any; // skipped typescript declaration check manually
// reference: https://github.com/Microsoft/TypeScript/issues/3691 (skipped declaration check)
export class RemoteResponse {
    res: any;
    originalEvent: any;
}


const defaultOptions = {escape: false, buffer: true, timeout: 3000};

export class NgRemote {
    jsRemoteMethod;
    sfController;
    remoteCallName;
    fetch;
    options;
    /**
     *  Usage: new NgRemote(method, controller).run(params...).then(callback)
     * */
    constructor(jsRemoteMethod, sfController, options = defaultOptions) {
        this.jsRemoteMethod = jsRemoteMethod;
        this.sfController = sfController;
        this.remoteCallName = `${this.sfController}.${this.jsRemoteMethod}`;
        this.fetch = this.getApi();
        this.options = options;
    }

    /** Call: promise(arg1, arg2)
     * */
    getApi(): any {
        const options = this.options;
        return (...args: any[]) => {
            const _allArguments = [...args];
            const callback = (resolve) => (res, originalEvent) => {
                resolve({
                    res,
                    originalEvent
                });
            };
            return new Promise((resolve, _) => {
                Visualforce.remoting.Manager.invokeAction(
                    this.remoteCallName, ..._allArguments,
                    callback(resolve), options
                );
            });
        };
    }

}
