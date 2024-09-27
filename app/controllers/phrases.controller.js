import phrases from '../data/phrases.json' assert {
    type: 'json'
}

export class PhrasesController {
    static async getPhrases(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        try {
            res.status(200).send(phrases);
        } catch (error) {
            console.error(error);
            res.status(500).send('500 - Internal Server Error');
        }
    }
}
