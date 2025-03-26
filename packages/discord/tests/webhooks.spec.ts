import { describe, it, expect, vi, beforeEach } from "vitest";
import { WebhookClient } from "discord.js";
import { createWebhookClient } from "#package"; 

vi.mock("discord.js", async (importOriginal) => {
  const mod = await importOriginal() as any;
  return {
    ...mod,
    WebhookClient: vi.fn(),
  };
});

describe("createWebhookClient", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should create a WebhookClient with a valid URL without options", () => {
    const mockUrl = "https://discord.com/api/webhooks/test/webhook";
    const mockWebhookClient = {} as WebhookClient;
    
    (WebhookClient as any).mockReturnValue(mockWebhookClient);

    const result = createWebhookClient(mockUrl);

    expect(WebhookClient).toHaveBeenCalledWith({ url: mockUrl }, undefined);
    expect(result).toBe(mockWebhookClient);
  });

  it("should create a WebhookClient with a WebhookClientData object without options", () => {
    const mockData = { 
      id: "123456", 
      token: "test-token" 
    };
    const mockWebhookClient = {} as WebhookClient;
    
    (WebhookClient as any).mockReturnValue(mockWebhookClient);

    const result = createWebhookClient(mockData);

    expect(WebhookClient).toHaveBeenCalledWith(mockData, undefined);
    expect(result).toBe(mockWebhookClient);
  });

  it("should return null when WebhookClient constructor throws an error with URL", () => {
    const mockUrl = "invalid-url";
    
    (WebhookClient as any).mockImplementation(() => {
      throw new Error("Invalid webhook");
    });

    const result = createWebhookClient(mockUrl);

    expect(result).toBeNull();
  });

  it("should return null when WebhookClient constructor throws an error with data object", () => {
    const mockData = { 
      id: "invalid-id", 
      token: "invalid-token" 
    };
    
    (WebhookClient as any).mockImplementation(() => {
      throw new Error("Invalid webhook");
    });

    const result = createWebhookClient(mockData);

    expect(result).toBeNull();
  });
});