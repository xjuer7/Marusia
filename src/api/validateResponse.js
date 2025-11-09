export async function validateResponse(response) {
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response;
}
