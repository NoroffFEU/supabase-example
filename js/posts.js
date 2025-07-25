import { supabase } from "./supabase.js";
import { checkAuth, logout } from "./auth.js";
import { displayMessage } from "./ui.js";

checkAuth();

loadPosts();

const postForm = document.querySelector("#post-form");
const logoutBtn = document.querySelector("#logout-btn");

// Handle logout
logoutBtn.addEventListener("click", logout);

// Handle new post creation
postForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const title = form.title.value.trim();
  const content = form.content.value.trim();

  try {
    const { error } = await supabase.from("posts").insert([{ title, content }]);

    if (error) {
      displayMessage("#message-container", "error", error.message);
      return;
    }

    displayMessage(
      "#message-container",
      "success",
      "Post created successfully"
    );
    form.reset();
    loadPosts();
  } catch (error) {
    console.log(error);

    displayMessage("#message-container", "error", error.toString());
  }
});

async function loadPosts() {
  const postsContainer = document.querySelector("#posts-list");
  postsContainer.innerHTML = "";

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      displayMessage("#message-container", "error", error.message);
      return;
    }

    if (!posts || posts.length === 0) {
      displayMessage(
        "#message-container",
        "info",
        "No posts available yet. Create your first post!"
      );
      return;
    }

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.log(error);
    displayMessage(
      "#message-container",
      "error",
      "An unexpected error occurred while loading posts."
    );
  }
}

function createPostElement(post) {
  const heading = document.createElement("h3");
  heading.textContent = post.title;
  return heading;
}
