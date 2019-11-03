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
        primary: '#ffeb3b',
        secondary: '#ffc107',
        accent: '#cddc39',
        error: '#f44336',
        warning: '#ff5722',
        info: '#8bc34a',
        success: '#4caf50'
        },
    },
  },
});
