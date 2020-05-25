export class LoginController {
    login(req: any, res: any) {
        res.status(200);
        res.json({});
    }
    public get(req,res) : string {
        return "/login";
    }
}
