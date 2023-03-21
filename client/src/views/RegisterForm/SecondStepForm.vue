<template>
  <header class="header">
    <h1 class="header-step-title">{{ formValues.personType === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica' }}</h1>
    <h3 class="header-step-subtitle">Etapa <span class="header-step-count">2</span> de 4</h3>
    <hr class="dotted">
  </header>

  <main>
    <div v-if="formValues.personType === 'individual'">
      <BaseInput 
        name="name"
        label="Nome" 
        v-model="formValues.name"
        :error="v$.name.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />

      <BaseInput 
        name="cpf"
        label="CPF" 
        v-mask-cpf
        v-model="formValues.cpf"
        :error="v$.cpf.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />

      <BaseInput 
        name="birth"
        type="date"
        label="Data de Nascimento" 
        v-model="formValues.birth"
        :error="v$.birth.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />
    </div>

    <div v-else-if="formValues.personType === 'company'">
      <BaseInput 
        name="corporateName"
        label="Razão Social" 
        v-model="formValues.corporateName"
        :error="v$.corporateName.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />

      <BaseInput 
        name="cnpj"
        label="CNPJ"
        v-mask-cnpj
        v-model="formValues.cnpj"
        :error="v$.cnpj.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />

      <BaseInput 
        name="openingDate"
        type="date"
        label="Data de Abertura" 
        v-model="formValues.openingDate"
        :error="v$.openingDate.$errors?.[0]?.$message"
        :disabled="isSubmitting"
      />
    </div>

    <BaseInput 
      name="phone"
      label="Telefone"
      v-mask-phone.br
      v-model="formValues.phone"
      :error="v$.phone.$errors?.[0]?.$message"
      :disabled="isSubmitting"
    />
  </main>

  <footer class="footer">
    <BaseButton
      v-if="currentStep > 0"
      outlined
      @click="onPreviousStep"
      :disabled="isSubmitting"
    >
      Voltar
    </BaseButton>

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
import BaseButton from '../../components/BaseButton.vue';

export default {
  props : {
    currentStep: { type: Number, default: 0 },
    formValues: { type: Object, default: {} },
    isSubmitting: { type: Boolean, default: false }
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
  emits: ['submitValidStep', 'submitPreviousStep', 'submitFinalStep'],
  methods: {
    onSubmitStep ()  {
       // validate fields
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // pass to the next step
        this.$emit('submitValidStep')
      }
    },
    onPreviousStep () {
      this.$emit('submitPreviousStep')
    }
  },
}
</script>
<style></style>