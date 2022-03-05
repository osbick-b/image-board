

// =============== Comments ================ //

const comments = {
    data() {
        return {
            name: "imgComments",
            emoji: "🥗",
            comments: [],
            newComm: {
                username: "",
                commtext: "",
            },
        };
    },
    props: ["imgIdC"], // "placeholder" for info that we'll get from the parent --> id of image to be loaded
    mounted: function () {
        console.log(">> mounted COMMENTS -- this.imgIdC", this.imgIdC);
        fetch(`/images/${this.imgIdC}/comments`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("comments.js -- from fetch: data", data);
                this.comments = data;
                console.log("comments.js --- this.comments", this.comments);
            })
            .catch((err) => {
                console.log("error in comments --- data from getComments", err); // OK UNTIL HERE, GOTTA DISPLAY
            });
    },
    methods: {
        postComment: function (e) {
            console.log(
                "comments.js -- postComment: this.newComm",
                this.newComm
            );
            fetch(`/images/${this.imgIdC}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.newComm),
            })
                .then((resp) => {
                    return resp.json();
                })
                .then(({ newComm }) => {
                    console.log(" newComm",  newComm);
                    return this.comments.unshift(newComm);
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
        <input v-model="newComm.username" type="text" name="username" id="username" required="required">
        <label for="commtext">commtext</label>
        <textarea v-model="newComm.commtext" type="text" name="commtext" id="commtext" rows="3" cols="40" required="required">Comment...</textarea>
        <button @click.prevent.default="postComment">Post</button>
    </form>
    <section v-for="comm in comments" class="posted">
        <div class="one-comment">
            <h6 class="comment username">{{comm.username}}</h6>
            <p class="commment text">{{comm.comment}}</p>
            <p class="comment date">{{comm.created_at}}</p>
        </div>
    </section>
</section>
    `,
};

// ====== Export Area ====== //
export default comments;
