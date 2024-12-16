import expressApi from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SwaggerJsConfig from "./docs/swaggerDocConfig.js";
import Database from "./model/db/db.js";
import Usuario from "./model/db/model/userModel.js";


class Express {
  static api = expressApi();
  static corsApi = cors();
  static bodyParserApi = bodyParser.json();
  static configExpress() {
    const port = 8080 || process.env.PORT;
    this.api.listen(port, async() => {
      console.log(`server running on the port ${port}`);
      await Database.main()
      
    });
  }

  static main() {
    this.api.use(this.bodyParserApi);
    this.api.use(this.corsApi);
    this.api.use(expressApi.static(`image`))
    SwaggerJsConfig.main(this.api)
    this.configExpress();
  }
}

Express.main();

