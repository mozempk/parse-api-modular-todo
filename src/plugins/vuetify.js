import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark:true,
    themes: {
      dark: {
        primary: '#34B56C',
        secondary: '#59ADFF',
        accent: '#FF5F40',
        error: '#f44336',
        warning: '#ff5722',
        info: '#8bc34a',
        success: '#4caf50'
        },
    },
  },
});
