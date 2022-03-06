import comments from "./comments.js";


// =============== Image Modal ================ //

const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
            currImg: {},
            imgIdP: this.imgIdC,
        };
    },
    components: {
        comments: comments, // --- registered component
    },
    props: ["imgIdC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        // console.log("in modal.js -- mount:imgIdC", this.imgIdC);

        fetch(`/images/${this.imgIdC}`) // --> the image itself and its additional info will be retrieved from DB by a fetch request
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.currImg = data;
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
            <img class="one-img" :src="this.currImg.url" alt="this.currImg.title">
            <h3 class="img-title">{{this.currImg.id}}{{this.currImg.title}}</h3>
            <p class="img-description">{{this.currImg.description}}</p>
            
            <comments :img-id-c="imgIdP"></comments>

            <button @click="askToDelete" class="btn delete destructive">DELETE</button>
        </div>
    </main>
    `,
};

// ====== Export Area ====== //
export default imgModal;
