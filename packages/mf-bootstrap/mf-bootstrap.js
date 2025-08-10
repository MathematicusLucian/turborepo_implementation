(async function bootstrapMF() {
    if (window.__mf_bootstrapped) return;
    window.__mf_bootstrapped = true;

    const apps = process.env.APPS ? process.env.APPS.split(',') : []
    const ports = process.env.PORTS ? process.env.PORTS.split(',') : []
    // We don't want to hardcode these, but have one source of truth in the Docker config
    // const remotes = [
    //     { name: 'ui_header', url: 'http://localhost:3001/_next/static/chunks/remoteEntry.js' },
    //     { name: 'ui_navbar', url: 'http://localhost:3002/_next/static/chunks/remoteEntry.js' }
    // ];
    const remotes = apps.reduce((acc, app, i) => {
        const port = ports[i] || '3000'
        acc[app] = `http://localhost:${port}/remoteEntry.js`
        return acc
    }, {})

    await Promise.all(remotes.map(r => new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = r.url;
        s.crossOrigin = 'anonymous';
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
    })));

    if (typeof __webpack_init_sharing__ === 'function') {
        await __webpack_init_sharing__('default');
        for (const r of remotes) {
            const container = window[r.name];
            if (container && typeof container.init === 'function') {
                await container.init(__webpack_share_scopes__.default);
            }
        }
    }
})();
// export default remotes