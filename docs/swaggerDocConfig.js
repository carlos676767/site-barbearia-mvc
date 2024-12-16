import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default class SwaggerJsConfig {
  static main(app) {
    app.use(`/doc`, swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(this.#config())))
  }

  static #config() {
    return {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Api para barbearia",
          version: "1.0.0",
          description: "Documentação de API utilizando Swagger com Node.js",
        },
      },
      apis: ["../routes/*.js"],
    };
  }
}
