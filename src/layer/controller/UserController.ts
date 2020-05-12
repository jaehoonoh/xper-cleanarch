
export class UserController {
    public create(req,res) {
        req.json
        console.log('Body=' + req.body);
        res.type("application/json");
        res.json({ name: 'jaehoon111' });
    }
}
