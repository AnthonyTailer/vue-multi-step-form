<template>
  <header class="header">
    <h1 class="header-step-title">Senha de acesso</h1>
    <h3 class="header-step-subtitle">Etapa <span class="header-step-count">3</span> de 4</h3>
    <hr class="dotted">
  </header>

  <main>
    <BaseInput
      name="password"
      type="password"
      label="Sua senha"
      v-model="formValues.password"
      :error="v$.password.$errors?.[0]?.$message"
    />
  </main>

  <footer class="footer">
    <BaseButton
      v-if="currentStep > 0"
      outlined
      @click="onPreviousStep"
    >
      Voltar
    </BaseButton>

    <BaseButton
      @click="onSubmitStep"
    >
      Continuar
    </BaseButton>
  </footer>
</template>
<script>
import useValidate from "@vuelidate/core";
import useForm from '../../store/form.js';
import BaseInput from '../../components/BaseInput.vue';
import BaseButton from '../../components/BaseButton.vue';

export default {
  props : {
    currentStep: { type: Number, default: 0 },
    formValues: { type: Object, default: {} }
  },
  components: { BaseInput, BaseButton },
  setup(props) {
    const {
      getValidationRules
    } = useForm();

    const rules = getValidationRules(props.formValues);
    const v$ = useValidate(rules.value[props.currentStep], props.formValues);

    return { v$ }
  },
  emits: ['submitValidStep', 'submitPreviousStep'],
  methods: {
    onPreviousStep () {
      this.$emit('submitPreviousStep')
    },
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