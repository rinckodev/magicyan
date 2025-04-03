export function decodeBase64Json<T = unknown>(base64String: string): T | null {
    try {
        return JSON.parse(Buffer.from(base64String, "base64").toString("utf-8"));
    } catch (error) {
        console.error("Erro ao decodificar JSON:", error);
        return null;
    }
}