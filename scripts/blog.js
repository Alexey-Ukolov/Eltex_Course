const createBtn = document.getElementById("createBtn");
const statsBtn = document.getElementById("statsBtn");
const formSection = document.getElementById("createForm");
const cancelBtn = document.getElementById("cancelBtn");
const addPostBtn = document.getElementById("addPostBtn");

const dialog = document.getElementById("statsDialog");
const closeDialog = document.getElementById("closeDialog");
const postCountEl = document.getElementById("postCount");

const container = document.querySelector(".article-container");
const form = document.querySelector(".create-article");

let postCount = document.querySelectorAll(".blog-article").length;

createBtn.addEventListener("click", () => {
    formSection.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
    formSection.classList.remove("show");
    form.reset();
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
    const formTitle = document.getElementById("create-article__inp");
    const formText = document.getElementById("create-article__text");

    const title = formTitle.value.trim();
    const text = formText.value.trim();

    if (!title) {
        alert("Введите заголовок статьи");
        formTitle.focus();
        return;
    }

    if (!text) {
        alert("Введите описание статьи");
        formText.focus();
        return;
    }

    const currentDate = new Date().toLocaleDateString('ru-RU', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });

    const template = `
        <article class="blog-article">
            <div class="blog-article-img">
                <img src="./assets/images/placeholder.png" alt="mock">
            </div>
            <div class="blog-article-text">
                <h4 class="blog-article-title">${title}</h4>
                <p class="blog-article-description">${text}</p>
                <time>${currentDate}</time>
            </div>
            <button id="article-delete-btn" class="article-delete-btn">✕</button>
        </article>
    `;

    container.insertAdjacentHTML("beforeend", template);
    
    postCount++;
    form.reset();
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