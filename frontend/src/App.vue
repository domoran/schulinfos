<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Schulinfos.net</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!currentUser" 
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Not Logged In</span>
      </v-btn>

      <v-btn
        v-if="currentUser" 
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">{{$store.getters.currentUser}}</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<script>
import Login from "./components/Login";
import store from "@/store";
import jquery from "jquery";
import api from "@/lib/api";

export default {
  name: "App",
  components: {
    Login,
  },
  data() {
    return {
      currentUser: null
    };
  },

  mounted() {
    api
      .getCurrentUser()
      .then((user) => {
        console.log("Received current user from API!");
        this.$store.commit("setCurrentUser", user);
      })
      .catch(err => {
        this.$store.commit("setCurrentUser", null);
      });
  }
};
</script>
