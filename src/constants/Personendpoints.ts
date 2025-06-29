
const serverProtocol = import.meta.env.VITE_SERVERPROTOCOL;
const serverIp = import.meta.env.VITE_PERSONBACKENDSERVERIP;
const serverPort = import.meta.env.VITE_PERSONBACKEND_PORT;


//export const PersonEndpoints2 = `https://localhost:7017/api/persons`;
export const PersonEndpoints = `${serverProtocol}${serverIp}${serverPort}/api/persons`;


