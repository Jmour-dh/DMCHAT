const LOCALHOST_IP: string = 'http://192.168.1.60';

let settings: {devRunMode: number; withConsole: boolean} = {
  devRunMode: 100,
  withConsole: true,
};
let hostname: string = `${LOCALHOST_IP}:3001`;

// Utilisez export direct au lieu de module.exports
export {settings, hostname};