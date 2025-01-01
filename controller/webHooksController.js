import cache from "../cache/cache.js"
import ModelHistoric from "../model/modelHistoric.js"

export default class WebHook {

    static async weHookStripe(req, res){
        const notificationPay = req.body.type

        if (notificationPay === `charge.succeeded`) {
           
            const data = cache.get(`objectTranstion`)
            const {email, IDCABELO, DATERESERVA, HORA} = data
            
            await ModelHistoric.historcUser(email, IDCABELO, DATERESERVA, HORA)
            return res.status(201)
        }
        
    }

    
    static webHookMercadoPago(req, res){

    }
}

