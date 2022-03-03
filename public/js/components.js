const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
            modalImg: {},
        };
    },
    props: ["imgId"],
    mounted: function () {
        fetch(`/images/${this.imgId}`)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.modalImg = data;
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
    <button @click="askToClose" class="btn-close">X</button>
    <img class="one-img" :src="this.modalImg.url" alt="this.modalImg.title">
    <h3 class="img-title">{{this.modalImg.title}}</h3>
    <p class="img-description">{{this.modalImg.description}}</p>
    <button @click="askToDelete" class="btn delete destructive">DELETE</button>
    </div>
    </main>
    `,
};

// ====== Export Area ====== //
export default imgModal;
