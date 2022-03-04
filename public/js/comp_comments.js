

// =============== Comments ================ //

const comments = {
    data() {
        return {
            name: "imgComments",
            emoji: "🥗",
        };
    },
    props: ["currImgStuffC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        console.log(">> mounted COMMENTS");
        console.log("in comments.js --- this.currImgStuffC", this.currImgStuffC);
    },
    methods: {
        // askToDelete: function () {
        //     this.$emit("clickedDelete");
        // },
    },
    template: `
    <section id="comments">
        <h6 class="username">{{currImgStuffC.commUser}}</h6>
        <p class="one-comment">{{currImgStuffC.comment}}</p>
        <p class="comment date">{{currImgStuffC.commTimestamp}}</p>
    </section>
    `,
};

// ====== Export Area ====== //
export default comments;
