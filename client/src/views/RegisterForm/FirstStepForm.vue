<template>
  <h1>Etapa 1 de 4</h1>
  <h1>Seja bem vindo(a)</h1>

    <BaseInput
      name="email"
      label="Endereço de E-mail"
      v-model="formValues.email"
      :error="v$.email.$errors?.[0]?.$message"
    />

    <BaseRadioButtonGroup
      name="personType"
      :options="personTypeOptions"
      v-model="formValues.personType"
      :error="v$.personType.$errors?.[0]?.$message"
    />

    <BaseButton
        @click="onSubmitStep"
      >
        Continuar
      </BaseButton>
</template>
<script>
import useValidate from "@vuelidate/core";
import useForm from '../../store/form.js';
import BaseInput from '../../components/BaseInput.vue';
import BaseRadioButtonGroup from '../../components/BaseRadioButtonGroup.vue';
import BaseButton from '../../components/BaseButton.vue';

export default {
  props : {
    currentStep: { type: Number, default: 0 },
    formValues: { type: Object, default: {} }
  },
  components: { BaseInput, BaseRadioButtonGroup, BaseButton },
  setup(props) {
    const {
      getValidationRules
    } = useForm();

    const rules = getValidationRules(props.formValues);
    const v$ = useValidate(rules.value[props.currentStep], props.formValues);

    return { v$ }
  },
  data() {
    return {
      personTypeOptions: [{
          label: "Pessoa física",
          value: "individual",
          checked: this.formValues.personType === "individual"
        }, {
          label: "Pessoa jurídica",
          value: "company",
          checked: this.formValues.personType === "company"
      }]
    }
  },
  emits: ['submitValidStep', 'submitPreviousStep'],
  methods: {
    onSubmitStep ()  {
       // validate fields
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // pass to the next step
        console.log(`Valid STEP ${this.currentStep}`)
        this.$emit('submitValidStep')
      }
    }
  },
}
</script>
<style></style>