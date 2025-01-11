import Email from "../utils/email";
import EmailValide from "../utils/emailServiceValide.js";
import ValidateFields from "../utils/ValidateFields.js";



export default class OtherThingsWebsiteController{
    static async sendEmail(req, res){
       try {
        const {email, subject, message} = req.body;
        EmailValide.valideEmail(email);
        ValidateFields.validateFields(email, subject, message);
        await Email.sendEmail(email, `suporte user`, message);
        return res.status(200).json({message: "Email enviado com sucesso"});
       } catch (error) {
        return res.status(500).json({error: error.message});
       }
    }

}