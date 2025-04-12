import MercadoPagoPixController from "../../pagamentos/mercadoApi.js";
import StripeApi from "../../pagamentos/stripeApi.js";

export default class OptionPayService {
  static async optionsPayMent(PRECO, pagamentoForma, nameItem) {
    const optionsValue = {
      Pix: async () => {
        const { ticket_url, qr_code_base64 } =
          await MercadoPagoPixController.generatePayMent(PRECO, nameItem);

        return ticket_url;
      },

      Cartão: async () => {
        const { url } = await StripeApi.generatePayment(PRECO, nameItem);
        return url;
      },
    };

    const selectOption = optionsValue[pagamentoForma];

    if (selectOption) {
      return await selectOption();
    }

    throw new Error("select option valid");
  }
}
