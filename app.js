const koa = require("koa");
const koaRouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://test:test123@ds063178.mlab.com:63178/londonjob", {
  useNewUrlParser: true
});

var blogSchema = mongoose.Schema({
  title: String,
  post: String,
  author: String
});

var Blog = mongoose.model("Blog", blogSchema);

const app = new koa();
const router = new koaRouter();

const things = ["Hans", "Wurst", "Radler"];

app.use(bodyParser());

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false
});

// routes

router.get("/", index);
router.get("/add", showAddPost);
router.post("/add", addPost);
router.get("/edit/:id", editPost);
router.get("/delete/:id", deletePost);

async function editPost(ctx) {}

async function deletePost(ctx) {
  const post = ctx.request.body;
}

async function index(ctx) {
  await ctx.render("index", {
    title: "My Blog",
    things: things
  });
}

async function showAddPost(ctx) {
  await ctx.render("addPost");
}

async function addPost(ctx) {
  const myPost = new Blog(ctx.request.body);
  myPost.save();
  //ctx.body = myPost;

  ctx.redirect("/");
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log("Server running on port 3000"));
