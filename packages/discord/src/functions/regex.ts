/**
 * 
 * @param mention Discord mentionable string
 * @returns mentionable id or null
 * 
 * ```ts
 * const user = "<@264620632644255745>";
 * const channel = "<#1068689068256403457>";
 * const role = "<@&929925182796226632>";
 * 
 * extractMentionId(user) // 264620632644255745
 * extractMentionId(channel) // 1068689068256403457
 * extractMentionId(role) // 929925182796226632
 * ```
 */
export function extractMentionId(mention: string): string | null {
    const regex = new RegExp(/\d+/);
    const matches = mention.match(regex);
    return matches ? matches[0] : null;
}