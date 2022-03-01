import * as Vue from './830_vue.js';

const app = Vue.createApp({
    data() {
        return {
            name: "rue",
            
        };
    },
    methods: {
       selectFile: function(e){
           console.log("selectFile runs");
           console.log("file:", e.target.files[0]);
           this.file = e.target.files[0];
       },
    }
}); // us creating a vue application

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT