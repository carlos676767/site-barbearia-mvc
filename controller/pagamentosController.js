import OptionPayService from "../cache/service/optionPayService.js";
import SetCache from "../cache/setCache.js";
import ModelDataValides from "../model/modelDataValides.js";
import GetCabeloUser from "../model/modelGetCabelo.js";

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

      const getCabelo = await GetCabeloUser.getCabelo(cabelo);

      const { PRECO, NOME_IMAGE, ID } = getCabelo;

      const payMents = await OptionPayService.optionsPayMent(
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

    
      if (payMents.ticket_url) {
        return res.status(200).send({
          url: payMents.ticket_url,
        });
      }

      return res.status(200).send({ url: payMents });
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }


}
