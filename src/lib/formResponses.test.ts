import assert from "node:assert/strict";
import { test } from "node:test";
import { getFormErrorMessage } from "./formResponses";

test("form error summaries include readable field-level messages", async () => {
  const response = new Response(
    JSON.stringify({
      error: "Please check the submitted fields.",
      fields: {
        pitchDeck: ["Enter a valid HTTP or HTTPS URL."],
        name: ["Name is required."],
      },
    }),
    { status: 422, headers: { "Content-Type": "application/json" } },
  );

  assert.equal(
    await getFormErrorMessage(response, "Fallback"),
    "Please check the submitted fields.\nPitch Deck: Enter a valid HTTP or HTTPS URL.\nName: Name is required.",
  );
});

test("form error summaries use the fallback for invalid response bodies", async () => {
  const response = new Response("not json", { status: 500 });

  assert.equal(await getFormErrorMessage(response, "Please try again."), "Please try again.");
});
