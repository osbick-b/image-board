import comments from "./comp_comments.js";


// =============== Image Modal ================ //

const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
            currImgStuff: {},
            imgIdP: this.imgIdC,
        };
    },
    components: {
        comments: comments, // --- registered component
    },
    props: ["imgIdC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        console.log("in modal.js --- this.currImgStuff", this.currImgStuff);

        ////////////// ---- history stuff testing area //////////////////////
        console.log(">> mounted MODAL");
        console.log("this.imgIdC", this.imgIdC);
        history.pushState({}, "", `/${this.imgIdC}`);
        console.log("location.pathname --> in modal ", location.pathname); // --> also gives "/"
        ////////////// ---- end of history stuff area ////////////////////
        fetch(`/images/${this.imgIdC}`) // --> the image itself and its additional info will be retrieved from DB by a fetch request
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.currImgStuff = data;
            })
            .catch((err) => {
                console.log("error in components.js - mounted: fetch", err);
            });
    },
    methods: {
        askToClose: function () {
            // console.log(">> Asking to close modal. yell to parent about it");
            this.$emit("clickedX"); // yells to parent
        },
        askToDelete: function () {
            this.$emit("clickedDelete");
        },
    },
    template: `
    <main class="img-modal bg">
        <div class="container">
            <button @click="askToClose"  class="btn-close">X</button>
            <img class="one-img" :src="this.currImgStuff.url" alt="this.currImgStuff.title">
            <h3 class="img-title">{{this.currImgStuff.id}}{{this.currImgStuff.title}}</h3>
            <p class="img-description">{{this.currImgStuff.description}}</p>
            
            <comments :curr-img-stuff-c="currImgStuff"></comments>

            <button @click="askToDelete" class="btn delete destructive">DELETE</button>
        </div>
    </main>
    `,
};

// ====== Export Area ====== //
export default imgModal;
