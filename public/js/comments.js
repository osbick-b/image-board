

// =============== Comments ================ //

const comments = {
    data() {
        return {
            name: "imgComments",
            emoji: "🥗",
            // comments: this.commentsC,
            comments: [],
            commInput: {
                username: "",
                commtext: "",
            },
        };
    },
    props: ["imgIdC", "commentsC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        // console.log("comments.js --- this.comments", this.comments);
        // console.log("comments.js --- this.commentsC", this.commentsC);
        fetch(`/images/${this.imgIdC}/comments`)
            .then((resp) => resp.json())
            .then((data) => {
                this.comments = data;
                console.log("comments.js --- from DB: this.comments", this.comments);
            })
            .catch((err) => {
                console.log("error in comments --- data from getComments", err); // OK UNTIL HERE, GOTTA DISPLAY
            });

    },
    methods: {
        resetInput: function () {
            this.commInput = {
                username: "",
                commtext: "",
            };
            console.log("this.commInput", this.commInput);
        },
        postComment: function (e) {
            console.log(
                "comments.js -- postComment: this.commInput",
                this.commInput
                );
                fetch(`/images/${this.imgIdC}/postcomm`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.commInput),
                })
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    console.log(" data", data);
                    this.resetInput();
                    return this.comments.unshift(data);
                })
                .catch((err) => {
                    console.log("error in /upload", err);
                });
        },
        // askToDelete: function () {
        //     this.$emit("clickedDelete");
        // },
    },
    template: `<section id="comments" >
    <form class="post-comment">
        <label for="username">username</label>
        <input v-model="commInput.username" type="text" name="username" id="username" required="required">
        <label for="commtext">commtext</label>
        <textarea v-model="commInput.commtext" type="text" name="commtext" id="commtext" rows="3" cols="40" required="required"></textarea>
        <button @click.prevent.default="postComment">Post</button>
    </form>
    <section v-for="comm in comments" class="posted">
        <div class="one-comment">
            <h4 class="comment username">{{comm.id}} 🍀 {{comm.username}}</h4>
            <p class="commment text">{{comm.comment}}</p>
            <p class="comment date">{{comm.created_at}}</p>
        </div>
    </section>
</section>
    `,
};

// ====== Export Area ====== //
export default comments;
