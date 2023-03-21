var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var cors = require("cors");
var { body, validationResult } = require("express-validator");
var { phoneNumberValidation, cpfCnpjValidation } = require("./utils.js");

var app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

// for CORS
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post(
  "/registration",
  [
    body("email").notEmpty().withMessage("E-mail é obrigatório"),
    body("email").isEmail().withMessage("O e-mail precisa ser válido"),

    body("personType")
      .notEmpty()
      .withMessage("Você deve informar se é Pessoa Física ou Jurídica"),
    body("personType").custom((value) => {
      if (!["individual", "company"].includes(value)) {
        return Promise.reject("Tipo de pessoa informado é inválido");
      }
      return true;
    }),

    body("name")
      .if(body("personType").equals("individual"))
      .notEmpty()
      .withMessage("Nome é obrigatório"),

    body("cpf")
      .if(body("personType").equals("individual"))
      .notEmpty()
      .custom((value) => {
        if (!cpfCnpjValidation(value)) {
          return Promise.reject("CPF informado é inválido");
        }
        return true;
      }),

    body("birth")
      .if(body("personType").equals("individual"))
      .notEmpty()
      .isDate()
      .withMessage("Data de nascimento informada é inválida"),

    body("corporateName")
      .if(body("personType").equals("company"))
      .notEmpty()
      .withMessage("Razão Social é obrigatório"),

    body("cnpj")
      .if(body("personType").equals("company"))
      .notEmpty()
      .custom((value) => {
        if (!cpfCnpjValidation(value)) {
          return Promise.reject("CNPJ informado é inválido");
        }
        return true;
      }),

    body("openingDate")
      .if(body("personType").equals("company"))
      .notEmpty()
      .isDate()
      .withMessage("Data de abertura informada é inválida"),

    body("phone")
      .notEmpty()
      .custom((value) => {
        if (!phoneNumberValidation(value)) {
          return Promise.reject("Telefone informado é inválido");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("A senha informada deve conter ao menos 6 caracteres"),
  ],
  function (req, res) {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(201).json({
      message: "O cadastro foi realizado com sucesso!",
    });
  }
);

app.listen(3000);
