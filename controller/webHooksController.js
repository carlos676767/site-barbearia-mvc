import cache from "../cache/cache.js";
import ModelHistoric from "../model/modelHistoric.js";


class GetUserAndSaveHistoric{
  static userGet() {
    const data = cache.get(`objectTranstion`);
    return ({ email, IDCABELO, DATERESERVA, HORA } = data);
  }

  static async saveHistoric(res) {
    const { email, IDCABELO, DATERESERVA, HORA } = GetUserAndSaveHistoric.userGet();
    await ModelHistoric.historcUser(email, IDCABELO, DATERESERVA, HORA);
    return res.status(201);
  }
}


export default class WebHook  extends GetUserAndSaveHistoric {

  static async weHookStripe(req, res) {
    const notificationPay = req.body.type;
    if (notificationPay === `charge.succeeded`) {
     await WebHook.saveHistoric(res);
    }
  }

  static async webHookMercadoPago(req, res) {
    const idPay = req.body.id;
    const getSucessPay = await fetch(
      `https://api.mercadopago.com/v1/payments/${idPay}`
    );
    
    const getPayList = await getSucessPay.json();
    const { status } = getPayList.data;

    if (status === "approved") {
      await WebHook.saveHistoric(res);
    }
  }
}