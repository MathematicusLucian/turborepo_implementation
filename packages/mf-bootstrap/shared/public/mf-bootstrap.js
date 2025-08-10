const apps = process.env.APPS ? process.env.APPS.split(',') : []
const ports = process.env.PORTS ? process.env.PORTS.split(',') : []

const remotes = apps.reduce((acc, app, i) => {
    const port = ports[i] || '3000'
    acc[app] = `http://localhost:${port}/remoteEntry.js`
    return acc
}, {})

export default remotes


//   await Promise.all(remotes.map(r => new Promise((res, rej) => {
//     const s = document.createElement('script');
//     s.src = r.url;
//     s.crossOrigin = 'anonymous';
//     s.onload = res;
//     s.onerror = rej;
//     document.head.appendChild(s);
//   })));

//   if (typeof __webpack_init_sharing__ === 'function') {
//     await __webpack_init_sharing__('default');
//     for (const r of remotes) {
//       const container = window[r.name];
//       if (container