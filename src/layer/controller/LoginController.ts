export class LoginController {
    public get(req,res) : string {
        return "/login";
    }

    login(req: any, res: any) {
        res.status(404);
        res.json({});
    }
}
