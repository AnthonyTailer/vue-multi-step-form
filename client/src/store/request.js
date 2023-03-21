import { reactive } from "vue";

export default function useRequest() {
  const state = reactive({
    isLoading: false,
    error: "",
    response: null,
  });

  const postRegistration = async (body, { onSuccess, onError }) => {
    let response;

    try {
      state.isLoading = true;
      response = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      state.response = e;
      onError?.(state);
    } finally {
      state.isLoading = false;
    }

    if (response?.ok) {
      state.response = await response.json();
      onSuccess?.(state);
    } else {
      state.response = await response.json();
      state.error = true;
      onError?.(state);
    }
  };

  return { state, postRegistration };
}
