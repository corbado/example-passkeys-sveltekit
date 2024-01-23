export default interface Passkey {
    id: string;
    credentialHash: string;
    aaguid: string;
    userAgent: string;
    attestationType: string;
    transport: string[];
    backupEligible: boolean;
    backupState: boolean;
    lastUsed: string;
    status: string;
    created: string;
}