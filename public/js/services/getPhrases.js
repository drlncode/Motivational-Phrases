export const getPhrases = async ({ url }) => {
    let result = {};

    try {
        const response = await fetch(url);
        const phrases = await response.json();

        result = {
            success: true,
            data: phrases
        };
    } catch (e) {
        if (e) {
            result = {
                success: false,
                data: null
            };

            return result;
        }
    }

    return result;
}
