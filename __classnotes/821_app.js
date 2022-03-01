import * as Vue from './vue.js';

const app = Vue.createApp({
    data() {
        return {
            name: "rue",
            ternExp: true,
            show: 0,
            sweets: [{
                id: 1,
                name: "cake",
                emoji: "🍰",
            },{
                id: 2,
                name: "apple",
                emoji: "🍎",
            },{
                id: 3,
                name: "lollie",
                emoji: "🍭",
            },
        ],
        };
    },
    methods: {
        myFirstMethod: function() {
            console.log("in myFirstMethod");
        },
        mySecondMethodWithAnArg: function(arg) {
            console.log("argument passed in:", arg);
        }
    }
}); // us creating a vue application

app.mount("#main");