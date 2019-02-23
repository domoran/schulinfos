import Vue from 'vue';
import Vuex from 'vuex';

import { IUser } from '@/../../backend/src/data/models';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {}
    },
    mutations: {
        setCurrentUser(state: any, user: IUser): void {
            state.currentUser = user;
        }
    },
    getters: {
        getCurrentUser: (state:any) => state.currentUser,
    },
});
