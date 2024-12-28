import StripeApi from "../pagamentos/stripeApi.js";
import DecodJsonWebToken from "../utils/auth/jwtDecode.js";
import ValidateFields from "../utils/validacoes.js";

export default class Payments {
  static async routerPayMent(req, res) {
    try {
      const { cabelo, pagamentoForma, dataServico, usuarioToken } = req.body;
      const {email} = await DecodJsonWebToken.decod(usuarioToken);
      const {PRECO, NOME_IMAGE} = await GetCabelos.getCaelos(cabelo)


      ValidateFields.validateFields({cabelo, pagamentoForma, dataServico})

     const url =  await Payments.optionsPayMent(PRECO, pagamentoForma, NOME_IMAGE)
     return res.status(200).send({url: url})
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }

  static async optionsPayMent( PRECO, pagamentoForma, nameItem ) {

    const optionsValue = {
      pix: async () => {
        return  StripeApi.generatePayment(PRECO, nameItem)
      },

      Cartão: async () => {

      },
    };

    const selectOption = optionsValue[pagamentoForma];
    if (selectOption) {
    return  await selectOption();
    }
  }



  static async Stripe(res) {
    try {
    } catch (error) {}
  }
}
