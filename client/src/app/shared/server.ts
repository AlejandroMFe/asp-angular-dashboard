export interface Server {
    id: number;
    name: string;
    isOnline: boolean;
}

// generate 4 sample servers data
export const SAMPLE_SERVERS = [
    { id: 1, name: 'ProductionServer', isOnline: true },
    { id: 2, name: 'TestServer', isOnline: true },
    { id: 3, name: 'DevServer', isOnline: false },
    { id: 4, name: 'Localhost', isOnline: true }
];