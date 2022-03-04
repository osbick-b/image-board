import * as Vue from "./vue.js";
import imgModal from "./comp_modal.js";

const app = Vue.createApp({
    data() {
        return {
            appName: "fistagram",
            title: "",
            username: "",
            description: "",
            images: [],
            imgIdP: 0,
            isThereMore: null,
            lastLoadedId: 0,
            finalImgId: 0,
            cm: {
                username: "",
                imgIdP: 0,
                comment: "",
            },
        };
    },
    components: {
        "img-modal": imgModal, // --- registered component
    },
    updated: function () {
        console.log("app has been updated");
        // this.evalUrl();
    },
    mounted: function () {
        this.evalUrl();
        // history.pushState({}, "", "/");
        fetch("/images.json") // ------- ??? ------ where does it exist???
            .then((resp) => resp.json()) // --- !!! --- return ommitted -- w/o {}
            .then((data) => {
                this.updateLastLoadedFinal(data);
                this.images = data;
            })
            .catch((err) => {
                console.log("error in app.js - mounted:fetch", err);
            });
    },
    methods: {
        evalUrl: function () {
            let customUrl = location.pathname.slice(1);
            // evaluation of url will happen when app 1st mounts, if user is trying to access it from a different url than ROOT
            if (customUrl !== "") {
                console.log(">> user typed custom URL!", customUrl);
                fetch(`/evalUrl/${customUrl}`)
                    .then((resp) => resp.json())
                    .then(({ validImgId }) => {
                        console.log(
                            "app.js AFTER -- from evalUrl: resp",
                            validImgId
                        );
                        if (validImgId) {
                            console.log("id is valid");
                            this.openModal(validImgId);
                        } else {
                            console.log("id NOT valid");
                            history.replaceState({}, "", "/"); // replace invalid url in browsing history
                        }
                    })
                    .catch((err) => {
                        console.log("error in app.js -- evalUrl", err);
                    });
            }
        },
        closeModal: function () {
            // console.log("-- ok child, i heard ya. gonna close modal");
            history.pushState({}, "", "/");
            this.imgIdP = 0;
        },
        openModal: function (id) {
            // +++ cond test if id exists
            // for condit: maybe do the fetch request here instead of in the component? to test if id is in database
            this.imgIdP = id;
            console.log("this.imgIdP", this.imgIdP);
        },
        selectFile: function (e) {
            this.file = e.target.files[0];
        },
        updateLastLoadedFinal: function (data) {
            this.finalImgId = data[0].finalImgId;
            this.lastLoadedId = data[data.length - 1].id;
            this.isThereMore =
                this.lastLoadedId <= this.finalImgId ? false : true;
        },
        loadMoreImages: function () {
            console.log(">> want to load more images");
            fetch(`/images/more/${this.lastLoadedId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    this.images = [...this.images, ...data];
                    this.updateLastLoadedFinal(data);
                })
                .catch((err) => {
                    console.log("error in app.js -- loadMoreImages", err);
                });
        },
        postComment: function (e) {
            const fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            fetch("/upload.json", {
                method: "POST",
                body: this.cm,
            })
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    return this.images.unshift(data);
                })
                .catch((err) => {
                    console.log("error in /upload", err);
                });
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
                .then((data) => {
                    return this.images.unshift(data);
                })
                .catch((err) => {
                    console.log("error in /upload", err);
                });
        },
        deleteImg: function () {
            // +++ add confirmation screen
            fetch(`/images/${this.imgIdP}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imgIdP: this.imgIdP,
                    lastLoadedId: this.lastLoadedId,
                }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("img was deleted"); // --- use this as visib to add conditional in opening modal: cmmt out >> this.images = data
                    this.updateLastLoadedFinal(data);
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

addEventListener("popstate", (e) => {
    console.log(location.pathname, e.state);
    // show whatever is appropriate for the new url
    // if you need it, e.state has the data you passed to `pushState`
});