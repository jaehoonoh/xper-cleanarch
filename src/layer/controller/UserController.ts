
export class UserController {
    public create(req, res) {
        req.json
        console.log('Body=' + JSON.stringify(req.body));
        res.type("application/json");
        res.json({ name: 'jaehoon111' });
    }
}
