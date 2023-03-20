<template>
  <FormCardWrapper>
    <component
      :is="formSteps[currentStep]"
      :currentStep="currentStep"
      :formValues="state"
      @submitValidStep="nextStep"
      @submitPreviousStep="previousStep"
      @submitFinalStep="postRegistrationForm"
    ></component>
  </FormCardWrapper>
</template>

<script setup>
import { ref } from 'vue';

import FormCardWrapper from './components/FormCardWrapper.vue';

import FirstStepForm from './views/RegisterForm/FirstStepForm.vue';
import SecondStepForm from './views/RegisterForm/SecondStepForm.vue';
import ThirdStepForm from './views/RegisterForm/ThirdStepForm.vue';
import FinalStepForm from './views/RegisterForm/FinalStepForm.vue';
import useForm from './store/form';

const currentStep = ref(0);
const formSteps = [
  FirstStepForm,
  SecondStepForm,
  ThirdStepForm,
  FinalStepForm
];

const { state } = useForm();

const nextStep = () => {
  currentStep.value++;
}

const previousStep = () => {
  currentStep.value--;
}

const postRegistrationForm = async () => {
  console.log(state)
  // send to backend
  alert('Send to BACKEND')
}

</script>


<style scoped></style>
