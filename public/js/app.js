import * as Vue from "./vue.js";
import imgModal from "./components.js";

const app = Vue.createApp({
    data() {
        return {
            appName: "fistagram",
            title: "",
            username: "",
            description: "",
            images: [],
            condition: false,
            currImg: null,
        };
    },
    components: {
        "img-modal": imgModal,
    },
    updated: function () {
        console.log("app has been updated");
    },
    mounted: function () {
        console.log("app has been mounted");
        fetch("/images.json") // ------- ??? ------ where does it exist???
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
        closeModal: function() {
            // console.log("-- ok child, i heard ya. gonna close modal");
            this.condition = false;
        },
        openModal: function(img) {
            console.log(">> Wants to open modal");
            console.log("img arg", img);
            this.currImg = img;
            this.condition = true;
        },
        selectFile: function (e) {
            // console.log(">>> user selected file");
            this.file = e.target.files[0];
        },
        uploadImg: function (e) {
            console.log(">>> user wants to upload stuff");

            const fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            fetch("/upload.json", {
                method: "POST",
                body: fd,
            })
                .then((resp) => {
                    resp.json();
                })
                .then((resp) => {
                    console.log("resp in fetch /upload", resp);
                })
                .catch((err) => {
                    console.log("error in /upload", err);
                });
        },
    },
}); // us creating a vue application

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT
