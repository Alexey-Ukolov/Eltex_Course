const createBtn = document.getElementById("createBtn");
const statsBtn = document.getElementById("statsBtn");
const form = document.getElementById("createForm");
const cancelBtn = document.getElementById("cancelBtn");
const addPostBtn = document.getElementById("addPostBtn");

const dialog = document.getElementById("statsDialog");
const closeDialog = document.getElementById("closeDialog");
const postCountEl = document.getElementById("postCount");

const container = document.querySelector(".article-container");

let postCount = document.querySelectorAll(".blog-article").length;

createBtn.addEventListener("click", () => {
    form.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
    form.classList.remove("show");
});

container.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".article-delete-btn");
    if (deleteBtn) {
        const article = deleteBtn.closest(".blog-article");
        article.remove();
        postCount--;
    }
});
addPostBtn.addEventListener("click", () => {
    const template = `
        <article class="blog-article">
            <div class="blog-article-img">
                <img src="./assets/images/placeholder.png" alt="mock">
            </div>
            <div class="blog-article-text">
                <h4 class="blog-article-title">Новая статья</h4>
                <p class="blog-article-description">Тестовый текст статьи...</p>
                <time>${new Date().toLocaleDateString()}</time>
            </div>
            <button id="article-delete-btn" class="article-delete-btn">✕</button>
        </article>
    `;

    container.insertAdjacentHTML("beforeend", template);

    postCount++;
});

statsBtn.addEventListener("click", () => {
    postCountEl.textContent = postCount;
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

    if (isOutside) dialog.close();
});