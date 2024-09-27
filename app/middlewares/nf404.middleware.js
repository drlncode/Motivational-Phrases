export function nf404Middleware(req, res) {
    const method = req.method.toUpperCase();
    const path = req.path;

    res.status(404).json({
        status: 404,
        message: `The route ${method}:${path} was not found.`
    });
}
