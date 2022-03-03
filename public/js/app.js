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
            .then((resp) => resp.json()) // ------- return ommitted -- w/o {}
            .then((data) => {
                console.log("data", data);
                this.images = data;
                console.log("this.images", this.images);
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
            this.imgId = id;
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
            fetch(`/images/${this.imgId}/delete`)
                .then(() => {
                    // console.log("in app: img was deleted",resp); // no need to do anything with the response
                    console.log("this.imgId", this.imgId);
                    console.log("this.images", this.images[0]);
                    const delId = this.images.findIndex((element) => element.id == this.imgid); // ??? why doesnt it work??
                    console.log("delId", delId);
                    // this.images.splice(delId,1);
                    this.closeModal();
                })
                .catch((err) => {
                    console.log("error in app: deleteImg", err);
                });
        },
    },
});

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT
