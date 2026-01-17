/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GenerarIdVisita(clientAPI) {

    // 1) Mejor opción: API nativa
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    // 2) getRandomValues y formato manual
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        const buf = new Uint8Array(16);
        crypto.getRandomValues(buf);
        // version (4) y variant (RFC 4122)
        buf[6] = (buf[6] & 0x0f) | 0x40;
        buf[8] = (buf[8] & 0x3f) | 0x80;

        const hex = [...buf].map(b => b.toString(16).padStart(2, "0")).join("");
        // 8-4-4-4-12
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    // 3) Fallback sin crypto: añade entropía y respeta el formato v4
    const rnd = new Uint8Array(16);
    let t = Date.now();
    let p = (typeof performance !== "undefined" && typeof performance.now === "function") ? performance.now() : 0;

    for (let i = 0; i < 16; i++) {
        // mezcla timestamp, perf y random
        t = (t + Math.random() * 256 + p) % 256;
        rnd[i] = t | 0;
        p = (p * 1103515245 + 12345) % 0x100000000; // simple LCG para perturbar
    }

    rnd[6] = (rnd[6] & 0x0f) | 0x40; // version
    rnd[8] = (rnd[8] & 0x3f) | 0x80; // variant

    const hex = [...rnd].map(b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
