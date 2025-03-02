import { MercadoPagoConfig, Payment } from "mercadopago";
import path from "path";
import ValidateFields from "../utils/ValidateFields.js";
export default class MercadoPagoPixController {
  "use strict";
  static payment() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.SECRET_KEY_MERCADO_PAGO,
      timeout: 5000,
    });

    return new Payment(client);
  }

  static objectWithPaymentInformation(valorItem, nameItens) {
   
    ValidateFields.valideNum(valorItem);
    ValidateFields.validateFields(valorItem)
    
    return {
      transaction_amount: valorItem,
      description: `${nameItens}`,
      payment_method_id: "pix",
      payer: {
        email: `ftftftftt@gmail.com`,
      },
    };
  }

  static async generatePayMent(valorItem, nameItens) {
    try {
      const body = this.objectWithPaymentInformation(valorItem, nameItens);

      const pay = MercadoPagoPixController.payment();
      const createPayMnet = await pay.create({
        body,
      });

      const { ticket_url, qr_code_base64 } = createPayMnet.point_of_interaction.transaction_data;

      return { ticket_url, qr_code_base64 };
    } catch (error) {
      throw new Error("error creating payment");
    }
  }
}
