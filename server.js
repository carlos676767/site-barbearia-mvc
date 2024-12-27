import expressApi from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SwaggerJsConfig from "./docs/swaggerDocConfig.js";
import envCobfig from "dotenv";
import routerApi from "./routers/router.js";
import middlare from "./middleware/globalMiddleError.js";
import fs from "fs/promises";

envCobfig.config()


class Express {
  static api = expressApi()
  static corsApi = cors();
  static bodyParserApi = bodyParser.json();
  static configExpress() {
    const port = 8080 || process.env.PORT;
    this.api.listen(port, async () => {

      console.log(`server running on the port ${port}`);
    });

  }

  static async main() {
    this.api.use(this.bodyParserApi);
    this.api.use(this.corsApi);
    this.api.use(expressApi.static(`image`))
    this.api.use(expressApi.static('view'))
    this.api.use(middlare)
    this.api.use(routerApi)
    SwaggerJsConfig.main(this.api)
    
    this.configExpress();
   
    
  }
}

Express.main();
