export async function getFormErrorMessage(response: Response, fallback: string) {
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "error" in body && typeof body.error === "string") {
      const fieldDetails =
        "fields" in body && typeof body.fields === "object" && body.fields !== null
          ? Object.entries(body.fields)
              .flatMap(([field, messages]) =>
                Array.isArray(messages)
                  ? messages
                      .filter((message): message is string => typeof message === "string")
                      .map((message) => {
                        const label = field
                          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                          .replace(/^./, (character) => character.toUpperCase());
                        return `${label}: ${message}`;
                      })
                  : [],
              )
              .join("\n")
          : "";

      return fieldDetails ? `${body.error}\n${fieldDetails}` : body.error;
    }
  } catch {
    return fallback;
  }

  return fallback;
}
