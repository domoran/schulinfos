<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
        <v-card min-width=600>
            <v-card-title>Login</v-card-title>
            <v-card-text>
        
                <v-layout row>
                    <v-flex xs12 md5>
                    <v-text-field v-model="username" label="Username" required></v-text-field>
                    </v-flex>

                    <v-flex xs12 md4 offset-md1>
                    <v-text-field v-model="password" label="Password" required></v-text-field>
                    </v-flex>

                    <v-flex xs12 md2 >
                    <v-btn color="error" @click="login">Login</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout v-if="errorMessage" row>
                    <v-flex xs12 md12 >
                        <v-alert :value="true" type="error">{{errorMessage}} </v-alert>
                    </v-flex>
                </v-layout>
            </v-card-text>
    </v-card>
  
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/lib/api';

export default {
  data: () => ({
    username: "",
    password: "", 
    errorMessage: "Haaalo",
  }),

  methods: {
      login() {
          this.errorMessage = null;
          
          api.login(this.username, this.password)
          .then((user) => {
              console.log("Yuhu", user);
              this.$store.commit('setCurrentUser', user);
          })
          .catch((err) => {
              console.log(err);
              this.errorMessage = "Login Failed!" + err;
              this.$store.commit('setCurrentUser', null);
          });
      }
  }
};
</script>

<style>
</style>
