<template>
    <form @submit.prevent="login">
      <AppInput
        type="email"
        label="Email"
        name="email"
        v-model="email"
        autocomplete="email"
        placeholder="luke@jedi.com"
        class="mb-2"
      />
      <AppInput
        type="password"
        label="Password"
        name="password"
        v-model="password"
        class="mb-4"
      />
      <div class="flex justify-between">
        <AppButton type="submit" text="Login" />
        <router-link to="/forgot-password" class="text-sm base-link">
          Forgot your password?
        </router-link>
      </div>
      <FlashMessage :error="error" />
    </form>
  </template>
  
  <script>
  import { getError } from "@/utils/helpers";
  import AppButton from "@/components/AppButton";
  import AppInput from "@/components/AppInput";
  import AuthService from "@/services/AuthService";
  import FlashMessage from "@/components/FlashMessage";
  
  export default {
    name: "LoginView",
    components: {
      AppButton,
      AppInput,
      FlashMessage,
    },
    data() {
      return {
        email: null,
        password: null,
        error: null,
      };
    },
    methods: {
      async login() {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.error = null;
        try {
          await AuthService.login(payload);
          const authUser = await this.$store.dispatch("auth/getAuthUser");
          if (authUser) {
            this.$store.dispatch("auth/setGuest", { value: "isNotGuest" });
            this.$router.push("/dashboard");
          } else {
            const error = Error(
              "Unable to fetch user after login, check your API settings."
            );
            error.name = "Fetch User";
            throw error;
          }
        } catch (error) {
          this.error = getError(error);
        }
      },
    },
  };
  </script>