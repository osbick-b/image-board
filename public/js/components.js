const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
        };
    },
    props: ["imgId"],
    mounted: function () {
        // console.log(`${this.name} has been mounted`);
        console.log("props: ", this.imgId);
    },
    methods: {
        askToClose: function () {
            console.log("this.imgId", this.imgId);
            // console.log(">> Asking to close modal. yell to parent about it");
            this.$emit("clickedx"); // yells to parent
        },
    },
    template: `
    <main class="img-modal bg">
    <div class="container">
    <button @click="askToClose" class="btn-close">X</button>
            <img class="one-img" :src="this.imgId.url" alt="this.imgId.title">
            <h3 class="img-title">{{this.imgId.title}}</h3>
            <p class="img-description">{{this.imgId.description}}</p>
        </div>
    </main>
    `,
};


// ====== Export Area ====== //
export default imgModal;

