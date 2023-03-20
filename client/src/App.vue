<template>
  <FormCardWrapper>
    <component 
      :is="formSteps[currentStep]"
      :currentStep="currentStep"
      :formValues="state"
      :isSubmitting="requestState.isLoading"
      @submitValidStep="nextStep"
      @submitPreviousStep="previousStep"
      @submitFinalStep="postRegistrationHandler"
    >
  </component>
  </FormCardWrapper>

  <p v-if="requestState.isLoading">Por favor, aguarde...</p>

  <Modal v-if="modal.show" @close="handleModalClose">
    <template #header>
      <h3>{{ modal.header }}</h3>
    </template>
   <template #body>
    <h3 slot="body">{{ modal.body }}</h3>
   </template>
  </Modal>
</template>

<script setup>
import { ref, reactive } from 'vue';

import FormCardWrapper from './components/FormCardWrapper.vue';

import FirstStepForm from './views/RegisterForm/FirstStepForm.vue';
import SecondStepForm from './views/RegisterForm/SecondStepForm.vue';
import ThirdStepForm from './views/RegisterForm/ThirdStepForm.vue';
import FinalStepForm from './views/RegisterForm/FinalStepForm.vue';
import useForm from './store/form';
import useRequest from './store/request';
import Modal from './components/Modal.vue';

const currentStep = ref(0);
const formSteps = [
  FirstStepForm,
  SecondStepForm,
  ThirdStepForm,
  FinalStepForm
];

const { state } = useForm();
const { state: requestState, postRegistration } = useRequest();

const modal = reactive({
  show: false,
  header: '',
  body: ''
});

const handleModalClose = () => {
  modal.show = false
  modal.header = ''
  modal.body = ''
} 

const nextStep = () => {
  currentStep.value++;
}

const previousStep = () => {
  currentStep.value--;
}

const postRegistrationHandler = async () => {
  // send to backend
  await postRegistration(state, {
    onSuccess: (data) => {
      modal.show = true
      modal.header = "Cadastro realizado com sucesso"
      modal.body = data?.response?.message
      
      // reset form state
      state.email = ''
      state.personType = ''
      state.name = ''
      state.birth = ''
      state.cpf = ''
      state.phone = ''
      state.cnpj = ''
      state.corporateName = ''
      state.openingDate = ''
      state.password = ''

      // reset to first page
      currentStep.value = 0;

    },
    onError: (data) => {
      modal.show = true
      modal.header = "Erro ao realizar o cadastro!"
      modal.body = data?.response?.message
      // show errors
    }
  });
}

</script>


<style scoped></style>
