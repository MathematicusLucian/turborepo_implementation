export function getRemoteUrl(appName) {

    const port = process.env[`${appName.toUpperCase()}_PORT`] || '3000'
    if (!port) throw new Error(`PORT env variable for ${appName} not defined`)

    return `http://localhost:${port}/remoteEntry.js`
}

(async function bootstrapMF() {
    if (window.__mf_bootstrapped) return;
})

export async function waitForBootstrap() {
    if (window.__mf_bootstrapped) return;
    await new Promise < void> ((res) => {
        const check = () => (window.__mf_bootstrapped ? res() : setTimeout(check, 50));
        check();
    });
}

export async function loadRemote(moduleId) {
    // moduleId: "ui_header/Header" or "ui_header/singleSpa"
    const [scope, moduleName] = moduleId.split('/');
    await waitForBootstrap();
    if (typeof __webpack_init_sharing__ === 'function') {
        await __webpack_init_sharing__('default');
    }
    // const container = (window as any)[scope];
    const container = (window)[scope];
    if (!container) throw new Error(`Remote ${scope} not found`);
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(`./${moduleName}`);
    const Module = factory();
    return Module;
}
