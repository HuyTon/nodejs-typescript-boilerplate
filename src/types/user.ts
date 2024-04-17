export type User = { 
    id: number,
    name: string,
    role: string,
    authenticationToken?: string | null
};