

// =============== Comments ================ //

const comments = {
    data() {
        return {
            name: "imgComments",
            emoji: "🥗",
            comments: [],
        };
    },
    props: ["imgIdC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        console.log("in comments -- this.imgIdC", this.imgIdC);
        console.log(">> mounted COMMENTS");
        fetch(`/images/${this.imgIdC}/comments`).then((resp) => resp.json())
        .then((data) => {
            console.log("data", data);
        })
        .catch((err) => {
            console.log("error in comments --- data from getComments", err); // OK UNTIL HERE, GOTTA DISPLAY
        });
        console.log("comments.js --- this.comments", this.comments);
    },
    methods: {
        // askToDelete: function () {
        //     this.$emit("clickedDelete");
        // },
    },
    template: `
    <section id="comments">
        <h6 class="username">{{comments.username}}</h6>
        <p class="one-comment">{{comments.comment}}</p>
        <p class="comment date">{{comments.created_at}}</p>
    </section>
    `,
};

// ====== Export Area ====== //
export default comments;
