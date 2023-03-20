import { reactive } from "vue";

export default function useRequest() {
  const state = reactive({
    isLoading: false,
    error: "",
    response: null,
  });

  const postRegistration = async (body, { onSuccess, onError }) => {
    try {
      state.isLoading = true;
      const res = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      state.response = await res.json();
      console.log("REQUEST COM SUCESSO", { res: state.response });
      onSuccess?.(state);
    } catch (e) {
      console.log("REQUEST COM ERRRO", e);
      state.response = e;
      onError?.(state);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, postRegistration };
}
