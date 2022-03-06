import * as Vue from "./vue.js";
import imgModal from "./modal.js";

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
            // cm: {
            //     username: "",
            //     imgIdP: 0,
            //     comment: "",
            // },
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

        addEventListener("popstate", (e) => {
            console.log("POPSTATE EVENT", location.pathname, e.state);
            this.imgIdP = e.state.storedImgId; // ----- ??? ------ if u go back all the way, storedImgId eventually evals to null. why is that && how to solve it/ is thata problem?
        });
    },
    methods: {
        clickEsc: function () {
            console.log(">>> clicked enter <<<");
        },
        evalUrl: function (url = location.pathname) {
            let customUrl = url.slice(1);
            // evaluation of url will happen when app 1st mounts, if user is trying to access it from a different url than ROOT
            if (customUrl !== "") {
                fetch(`/evalUrl/${customUrl}`)
                    .then((resp) => resp.json())
                    .then(({ validId }) => {
                        if (validId) {
                            // console.log("--> id is valid", validId);
                            this.openModal(validId);
                        } else {
                            // console.log("--> id NOT valid", validId);
                            history.replaceState(
                                { storedImgId: this.imgIdP },
                                "",
                                "/"
                            ); // replace invalid url in browsing history
                        }
                    })
                    .catch((err) => {
                        console.log("error in app.js -- evalUrl", err);
                    });
            } else {
                this.closeModal();
            }
        },
        resetInput: function () {
            this.title = "";
            this.username = "";
            this.description = "";
            this.file = "";
        },
        closeModal: function () {
            // console.log("-- ok child, i heard ya. gonna close modal");
            this.imgIdP = 0;
            history.pushState({ storedImgId: this.imgIdP }, "", "/");
        },
        openModal: function (validId) {
            this.imgIdP = validId;
            history.pushState({ storedImgId: this.imgIdP }, "", `/${validId}`);
        },
        selectFile: function (e) {
            this.file = e.target.files[0];
        },
        updateLastLoadedFinal: function (images) {
            this.finalImgId = images[0].finalImgId;
            this.lastLoadedId = images[images.length - 1].id;
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
                    this.resetInput();
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
                .then((resp) => {
                    return resp.json();
                })
                // .then((data) => {
                //     console.log("app.js -- AFTER img should deleted", data); // --- use this as visib to add conditional in opening modal: cmmt out >> this.images = data
                //     this.updateLastLoadedFinal(data);
                //     this.images = data;
                //     this.closeModal();
                // })
                .then(({ deletedId }) => {
                    console.log("this.images", this.images);
                    console.log(
                        "app.js -- AFTER img should deleted: id",
                        deletedId
                    ); // --- use this as visib to add conditional in opening modal: cmmt out >> this.images = data
                    this.images = this.images.filter(
                        (img) => img.id != deletedId
                    );
                    this.updateLastLoadedFinal(this.images);
                    this.closeModal();
                })
                .catch((err) => {
                    console.log("error in app: deleteImg", err);
                });
        },
    },
});

app.mount("#main"); // THIS IS ESSENTIAL, OTHERWISE THE APP WON'T MOUNT
