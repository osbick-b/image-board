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
            imgId: 0,
            isThereMore: true,
        };
    },
    components: {
        "img-modal": imgModal, // --- registered component
    },
    updated: function () {
        console.log("app has been updated");
    },
    mounted: function () {
        fetch("/images.json") // ------- ??? ------ where does it exist???
            .then((resp) => resp.json()) // --- !!! --- return ommitted -- w/o {}
            .then((data) => {
                // console.log("data", data);
                this.images = data;
            })
            .catch((err) => {
                console.log("error in app.js - mounted:fetch", err);
            });
    },
    methods: {
        closeModal: function () {
            // console.log("-- ok child, i heard ya. gonna close modal");
            this.imgId = 0;
        },
        openModal: function (id) {
            // +++ cond test if id exists
            // for condit: maybe do the fetch request here instead of in the component? to test if id is in database
            this.imgId = id;
            console.log("this.imgId", this.imgId);
        },
        selectFile: function (e) {
            this.file = e.target.files[0];
        },
        uploadImg: function (e) {
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
                    return resp.json();
                })
                .then((resp) => {
                    return this.images.unshift(resp);
                })
                .catch((err) => {
                    console.log("error in /upload", err);
                });
        },
        deleteImg: function () {
            // +++ add confirmation screen
            fetch(`/images/${this.imgId}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imgId: this.imgId }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    // console.log("img was deleted"); // --- use this as visib to add conditional in opening modal: cmmt out >> this.images = data
                    this.images = data;
                    this.closeModal();
                })
                .catch((err) => {
                    console.log("error in app: deleteImg", err);
                });
        },
    },
});

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT
