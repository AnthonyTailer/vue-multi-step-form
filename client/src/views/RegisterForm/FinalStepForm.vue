<template>
  <header class="header">
    <h1 class="header-step-title">Revise suas informações</h1>
    <h3 class="header-step-subtitle">Etapa <span class="header-step-count">4</span> de 4</h3>
    <hr class="dotted">
  </header>

  <main>
    <BaseInput
      name="email"
      label="Endereço de E-mail"
      v-model="formValues.email"
      :error="v$.email.$errors?.[0]?.$message"
    />

    <div v-if="formValues.personType === 'individual'">
      <BaseInput 
        name="name"
        label="Nome" 
        v-model="formValues.name"
        :error="v$.name.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="cpf"
        label="CPF" 
        v-model="formValues.cpf"
        :error="v$.cpf.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="birth"
        type="date"
        label="Data de Nascimento" 
        v-model="formValues.birth"
        :error="v$.birth.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="phone"
        label="Telefone" 
        v-model="formValues.phone"
        :error="v$.phone.$errors?.[0]?.$message"
      />
    </div>

    <div v-else-if="formValues.personType === 'company'">
      <BaseInput 
        name="corporateName"
        label="Razão Social" 
        v-model="formValues.corporateName"
        :error="v$.corporateName.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="cnpj"
        label="CNPJ" 
        v-model="formValues.cnpj"
        :error="v$.cnpj.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="openingDate"
        type="date"
        label="Data de Abertura" 
        v-model="formValues.openingDate"
        :error="v$.openingDate.$errors?.[0]?.$message"
      />

      <BaseInput 
        name="phone"
        label="Telefone" 
        v-model="formValues.phone"
        :error="v$.phone.$errors?.[0]?.$message"
      />
    </div>
  
    <BaseInput
      name="password"
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
      Cadastrar
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
    const allRules = rules.value.reduce((prev, current) => ({ ...prev, ...current }), {})

    const v$ = useValidate(allRules, props.formValues);

    return { v$ }
  },
  emits: ['submitValidStep', 'submitPreviousStep'],
  methods: {
    onSubmitStep ()  {
       // validate fields
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // pass to the POST backend step
        this.$emit('submitFinalStep')
      }
    }
  },
}
</script>
<style></style>