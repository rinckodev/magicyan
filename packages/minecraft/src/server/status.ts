import { RouteBases } from "../index";

export interface ServerDebugInfo {
    ping: boolean;
    query: boolean;
    bedrock: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachehit: boolean;
    cachetime: number;
    cacheexpire: number;
    apiversion: number;
}

export interface OnlineServerInfo {
    online: true;
    ip: string;
    port: number;
    hostname?: string;
    debug: ServerDebugInfo;
    version: string;
    protocol?: {
        version: number;
        name?: string;
    };
    icon?: string;
    software?: string;
    map?: {
        raw: string;
        clean: string;
        html: string;
    };
    gamemode?: string;
    serverid?: string;
    eula_blocked?: boolean;
    motd: {
        raw: string[];
        clean: string[];
        html: string[];
    };
    players: {
        online: number;
        max: number;
        list?: Array<{
            name: string;
            uuid: string;
        }>;
    };
    plugins?: Array<{
        name: string;
        version: string;
    }>;
    mods?: Array<{
        name: string;
        version: string;
    }>;
    info?: {
        raw: string[];
        clean: string[];
        html: string[];
    };
}

export interface OfflineServerInfo {
    online: false;
    ip: string;
    port: number;
    hostname?: string;
    debug: ServerDebugInfo & {
        error: {
            ping: string,
            query: string
        }
    };
}

export type ServerInfo = OnlineServerInfo | OfflineServerInfo;

export async function fetchServerStatus(ip: string, bedrock: boolean = false): Promise<ServerInfo> {
    const url = `${RouteBases.mcsrvstat}/${bedrock ? "bedrock/" : ""}3/${ip}`;
    const response = await fetch(url);
    return await response.json() as ServerInfo;
}

export async function isServerOnline(ip: string, bedrock: boolean = false) {
    const url = `${RouteBases.mcsrvstat}/${bedrock ? "bedrock/" : ""}simple/${ip}`;
    const response = await fetch(url);
    return response.ok;
}