import { fetchSkinRender, FetchSkinRenderResult } from "#package";
import { describe, it, expect, vi } from "vitest";

const validNickname = "RinckoZ_";

type SuccessResult = Extract<FetchSkinRenderResult, { success: true }>

describe("fetchSkinRender", () => {
    it("should return skin render data when API response is successful", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            arrayBuffer: async () => new ArrayBuffer(8),
            url: `https://example.com/skins/render/default/${validNickname}/full`
        } as Response);

        const result = await fetchSkinRender(validNickname) as SuccessResult;
        expect(result.success).toBe(true);
        expect(result.data?.url).toBe(`https://example.com/skins/render/default/${validNickname}/full`);
        expect(result.data?.buffer).toBeInstanceOf(Buffer);
    });

    it("should return an error when API response is not ok", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found"
        } as Response);

        const result = await fetchSkinRender("invalidUser");
        expect(result).toEqual({ success: false, error: "Not Found", code: 404 });
    });
});
