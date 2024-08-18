export const getPhrases = async ({ url }) => {
    let reuslt = {};

    try {
        const response = await fetch(url);
        const phrases = await response.json();

        reuslt = {
            success: true,
            data: phrases
        };
    } catch (e) {
        if (e) {
            console.log(reuslt);

            reuslt = {
                success: false
            };
        }
    }

    return reuslt;
}