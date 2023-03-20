<template>
  <header class="header">
    <h1 class="header-step-title">Seja bem vindo(a)</h1>
    <h3 class="header-step-subtitle">Etapa <span class="header-step-count">1</span> de 4</h3>
    <hr class="dotted">
  </header>

  <main>
    <BaseInput
      name="email"
      label="Endereço de E-mail"
      v-model="formValues.email"
      :error="v$.email.$errors?.[0]?.$message"
      :disabled="isSubmitting"
    />
    <BaseRadioButtonGroup
      name="personType"
      :options="personTypeOptions"
      v-model="formValues.personType"
      :error="v$.personType.$errors?.[0]?.$message"
      :disabled="isSubmitting"
    />
  </main>

  <footer class="footer">
    <BaseButton
      @click="onSubmitStep"
      :disabled="isSubmitting"
    >
      Continuar
    </BaseButton>
  </footer>
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
    formValues: { type: Object, default: {} },
    isSubmitting: { type: Boolean, default: false }
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
  emits: ['submitValidStep', 'submitPreviousStep', 'submitFinalStep'],
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