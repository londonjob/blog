const koa = require("koa");
const koaRouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

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
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect("/");
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log("Server running on port 3000"));
