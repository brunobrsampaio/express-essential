/**
 * Sass
 */
require('../sass/app.scss');

/**
 * Vue Instance
 */
window.Vue = require('vue');

/**
 * Componen
 */
Vue.component('home', require('./components/home.vue').default);

/**
 * Init
 */
new Vue({
    el : '#app'
});