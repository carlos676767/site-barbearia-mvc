import cache from "../cache/cache.js";
import ModelHistoric from "../model/modelHistoric.js";

export default class WebHook {
  static userGet() {
    const data = cache.get(`objectTranstion`);
    return ({ email, IDCABELO, DATERESERVA, HORA } = data);
  }

  static async weHookStripe(req, res) {
    const notificationPay = req.body.type;

    if (notificationPay === `charge.succeeded`) {
      const { email, IDCABELO, DATERESERVA, HORA } = WebHook.userGet();
      await ModelHistoric.historcUser(email, IDCABELO, DATERESERVA, HORA);
      return res.status(201);
    }
  }

  static async webHookMercadoPago(req, res) {
    const idPay = req.body.id;
    const getSucessPay = await fetch(
      `https://api.mercadopago.com/v1/payments/${idPay}`
    );

    const { status } = getSucessPay.data;

    if (status === "approved") {
      const { email, IDCABELO, DATERESERVA, HORA } = WebHook.userGet();
      await ModelHistoric.historcUser(email, IDCABELO, DATERESERVA, HORA);
      return res.status(201);
    }
  }
}
