import { reactive, computed } from "vue";
import {
  required,
  email,
  helpers,
  requiredIf,
  minLength,
} from "@vuelidate/validators";

const phoneNumberValidation = (value) =>
  value.match(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/);
const cpfCnpjValidation = (value) =>
  value.match(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );

export const INITIAL_STATE = {
  email: "",
  personType: "",
  name: "",
  cpf: "",
  birth: "",
  phone: "",
  corporateName: "",
  cnpj: "",
  openingDate: "",
  password: "",
};

export default function useForm() {
  const state = reactive(INITIAL_STATE);

  const getValidationRules = (state) => {
    const getFirstStepRules = () => ({
      email: {
        required: helpers.withMessage("O e-mail é obrigatório", required),
        email: helpers.withMessage(
          "O e-mail informado é inválido. Formato test@test.com",
          email
        ),
      },
      personType: {
        required: helpers.withMessage(
          "Você deve informar se é Pessoa Física ou Jurídica",
          required
        ),
      },
    });

    const getSecondStepRules = () => {
      const isIndividualPerson = state.personType === "individual";

      const stepTwoRules = {
        individualRules: {
          name: {
            required: helpers.withMessage(
              "O nome é obrigatório",
              requiredIf(isIndividualPerson)
            ),
          },
          cpf: {
            required: helpers.withMessage(
              "CPF é obrigatório",
              requiredIf(isIndividualPerson)
            ),
            cpfValidation: helpers.withMessage(
              "O CPF informado é inválido",
              cpfCnpjValidation
            ),
          },
          birth: {
            required: helpers.withMessage(
              "Data de nascimento é obrigatório",
              requiredIf(isIndividualPerson)
            ),
          },
        },
        corporateRules: {
          corporateName: {
            required: helpers.withMessage(
              "A Razão Social é obrigatório",
              requiredIf(!isIndividualPerson)
            ),
          },
          cnpj: {
            required: helpers.withMessage(
              "CNPJ é obrigatório",
              requiredIf(!isIndividualPerson)
            ),
            cnpjValidation: helpers.withMessage(
              "CNPJ informado é inválido",
              cpfCnpjValidation
            ),
          },
          openingDate: {
            required: helpers.withMessage(
              "Data de abertura é obrigatório",
              requiredIf(!isIndividualPerson)
            ),
          },
        },
        commonRules: {
          phone: {
            required: helpers.withMessage(
              "Número de telefone é obrigatório",
              required
            ),
            phoneNumberValidation: helpers.withMessage(
              "O telefone informado é inválido",
              phoneNumberValidation
            ),
          },
        },
      };

      return {
        ...(isIndividualPerson
          ? stepTwoRules.individualRules
          : stepTwoRules.corporateRules),
        ...stepTwoRules.commonRules,
      };
    };

    const getThirdStepRules = () => ({
      password: {
        required: helpers.withMessage("A senha é obrigatória", required),
        minLength: helpers.withMessage(
          "A senha deve conter ao menos 6 caracteres",
          minLength(6)
        ),
      },
    });

    const rules = computed(() => [
      getFirstStepRules(),
      getSecondStepRules(),
      getThirdStepRules(),
    ]);

    return rules;
  };

  return {
    state,
    getValidationRules,
  };
}
