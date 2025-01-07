import { MercadoPagoConfig, Payment } from "mercadopago";
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
    const numberNgetaive = 0;

    if (
      !valorItem ||
      typeof valorItem !== "number" ||
      valorItem <= numberNgetaive
    ) {
      throw new Error("O valor do item (transaction_amount) é inválido.");
    }

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
