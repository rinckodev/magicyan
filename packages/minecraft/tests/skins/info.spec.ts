import { describe, expect, it, vi } from "vitest";
import { fetchSkinInfo } from "#package";

const validNickname = "RinckoZ_";
const invalidNickname = "INVALIDNICKNAME1234";

const trueCondition: boolean = true;

describe("fetchSkinInfo", () => {
  const mockSkinInfo = {
    playerUUID: "1234-5678-91011",
    skinUrl: "https://example.com/skin.png",
    userCape: "https://example.com/cape.png",
    processedSkinUrl: "https://example.com/processed_skin.png",
    skinType: "wide",
    skinTextureWidth: 64,
    skinTextureHeight: 64
  };
  it("should return skin info when the API responds successfully", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockSkinInfo
    } as Response);

    const result = await fetchSkinInfo(validNickname);

    expect(result).toEqual({ success: true, data: mockSkinInfo });
  });

  it("should return an error when the API response is not ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found"
    } as Response);

    const result = await fetchSkinInfo(invalidNickname);

    expect(result).toEqual({ success: false, error: "Not Found", code: 404 });
  });

  it("should return an error when JSON parsing fails", async () => {

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => {
        if (trueCondition) {
          throw new Error("Invalid JSON")
        }
        return mockSkinInfo;
      }
    } as Response);

    const result = await fetchSkinInfo("validNickname");

    expect(result).toEqual({ success: false, error: "Error: Invalid JSON", code: 502 });
  });

  it("should throw an error if the argument is not a string", async () => {
    // @ts-expect-error - Testing invalid input
    await expect(fetchSkinInfo(1234)).rejects.toThrow("The nickOrUIID parameter expected the string type but received number");
  });
});

