import SetCache from "../cache/setCache.js";
import ModelDataValides from "../model/modelDataValides.js";
import GetCabeloUser from "../model/modelGetCabelo.js";
import MercadoPagoPixController from "../pagamentos/mercadoApi.js";
import StripeApi from "../pagamentos/stripeApi.js";
import DecodJsonWebToken from "../utils/auth/jwtDecode.js";
import ValidateFields from "../utils/ValidateFields.js";
import ValideHoursService from "../utils/ValideHoursService.js";

export default class Payments {
  static async routerPayMent(req, res) {
    try {
      const { cabelo, pagamentoForma, dataServico, usuarioToken, hour } =
        req.body;

        

      ValidateFields.validateFields(req.body);
      ValideHoursService.valideHoursService(dataServico, hour);
      await ModelDataValides.modelDataValides(dataServico, hour);

      const { EMAIL } = await DecodJsonWebToken.decod(usuarioToken);

      const getCbaleo = await GetCabeloUser.getCabelo(cabelo);

      const { PRECO, NOME_IMAGE, ID } = getCbaleo;

      const payMents = await Payments.optionsPayMent(
        Number(PRECO),
        pagamentoForma,
        NOME_IMAGE
      );

      const objectUser = {
        email: EMAIL,
        IDCABELO: ID,
        DATERESERVA: dataServico,
        HORA: hour,
      };

      SetCache.setCache(`objectTranstion`, objectUser);

      if (payMents) {
        return res.status(200).send({ url: payMents });
      }

      return res.status(200).send({
        url: payMents.ticket_url,
      });
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }

  static async optionsPayMent(PRECO, pagamentoForma, nameItem) {
    const optionsValue = {
      Pix: async () => {
        const {ticket_url, qr_code_base64} = await MercadoPagoPixController.generatePayMent(
          PRECO,
          nameItem
        );

        return  ticket_url
        
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
