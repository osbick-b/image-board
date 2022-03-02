const imgModal = {
    data() {
        return {
            name: "imgModal",
            emoji: "🥗",
        };
    },
    props: ["currImg"],
    mounted: function () {
        // console.log(`${this.name} has been mounted`);
        console.log("props: ", this.currImg);
    },
    methods: {
        askToClose: function () {
            console.log("this.currImg", this.currImg);
            // console.log(">> Asking to close modal. yell to parent about it");
            this.$emit("clickedx"); // yells to parent
        },
    },
    template: `
    <main class="img-modal bg">
    <div class="container">
    <button @click="askToClose" class="btn-close">X</button>
            <img class="one-img" :src="this.currImg.url" alt="this.currImg.title">
            <h3 class="img-title">{{this.currImg.title}}</h3>
            <p class="img-description">{{this.currImg.description}}</p>
        </div>
    </main>
    `,
};


// ====== Export Area ====== //
export default imgModal;


// <main class="img-modal bg">
//     <div class="container">
//     <button @click="askToClose" class="btn-close">X</button>
//             <img class="one-img" src="img.url" alt="img.title">
//             <p class="img-title">{{img.title}}</p>
//         </div>
//     </main>