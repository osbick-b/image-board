import * as Vue from "./vue.js";

const app = Vue.createApp({
    data() {
        return {
            appName: "fistagram",
            heading: "",
            title: "",
            username:"",
            description:"",
            images: [],
        };
    },
    updated: function () {
        console.log("app has been updated");
    },
    mounted: function () {
        console.log("app has been mounted");
        fetch("/images.json")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data", data);
                this.images = data;
            })
            .catch((err) => {
                console.log("error in mounted:fetch", err);
            });
    },
    methods: {
        selectFile: function() {
            console.log("user selected file");
        },
        upload: function() {
            console.log("user wants to upload stuff");
        },
        // firstMethod: function() {
        //     console.log(">>> running firstMethod");
        // }
    },
}); // us creating a vue application

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT
