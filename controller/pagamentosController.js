import SetCache from "../cache/setCache.js";
import ModelDataValides from "../model/modelDataValides.js";
import GetCabeloUser from "../model/modelGetCabelo.js";
import StripeApi from "../pagamentos/stripeApi.js";
import DecodJsonWebToken from "../utils/auth/jwtDecode.js";
import ValidateFields from "../utils/ValidateFields.js";

export default class Payments {
  static async routerPayMent(req, res) {
    try {
      const { cabelo, pagamentoForma, dataServico, usuarioToken, hour } = req.body;

      ValidateFields.validateFields(req.body);
      await ModelDataValides.modelDataValides(dataServico, hour);

      const { email } = await DecodJsonWebToken.decod(usuarioToken);

      const getCbaleo = await GetCabeloUser.getCabelo(cabelo);

      const { PRECO, NOME_IMAGE, ID } = getCbaleo;

      const urlCodeStripe = await Payments.optionsPayMent(
        Number(PRECO),
        pagamentoForma,
        NOME_IMAGE
      );


      const objectUser = {
        email: email,
        IDCABELO: ID,
        DATERESERVA: dataServico
      }

      SetCache.setCache(`objectTranstion`, objectUser)
      
      if (urlCodeStripe) {
        return res.status(200).send({ url: urlCodeStripe });
      }

    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }

  static async optionsPayMent(PRECO, pagamentoForma, nameItem) {
    const optionsValue = {
      pix: async () => {

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
