const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
        };
    },
    props: ["myProp"],
    mounted() {
        // console.log(`${this.name} has been mounted`);
        console.log("props: ", this.myProp);
    },
    methods: {
        askToClose: function () {
            console.log(">> Asking to close modal. yell to parent about it");
            this.$emit("clickedx"); // yells to parent
        },
    },
    template: `
    <main class="img-modal bg">
    <div class="container">
    <button @click="askToClose" class="btn-close">X</button>
            <img src="" alt="">
            <p>Pls pretend i'm a real modal</p>
        </div>
    </main>
    `,
};


// ====== Export Area ====== //
export default imgModal;
