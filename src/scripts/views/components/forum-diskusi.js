class ForumDiscussion extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="forum.css">
    <div class="container">
      <h1>Forum Diskusi</h1>

      <h2>Tambahkan Diskusi Baru</h2>
      <form id="postForm">
        <label for="author">Nama:</label>
        <input type="text" id="author" required>

        <label for="message">Pesan:</label>
        <textarea id="message" required></textarea>

        <button type="submit">Kirim</button>
      </form>

      <h2>Posting Terbaru</h2>
      <div id="postsContainer"></div>
    </div>
    `;
  }

  connectedCallback() {
    // Menambahkan event listener ketika elemen terhubung ke DOM
    const formdiscussion = this.shadowRoot.getElementById('postForm');
    formdiscussion.addEventListener('submit', this.addPost.bind(this));

    // Menginisialisasi daftar posting
    this.posts = [];
  }

  displayPosts() {
    const postsContainer = this.shadowRoot.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    this.posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const authorElement = document.createElement('h3');
      authorElement.textContent = post.author;

      const messageElement = document.createElement('p');
      messageElement.textContent = post.message;

      postElement.appendChild(authorElement);
      postElement.appendChild(messageElement);

      postsContainer.appendChild(postElement);
    });
  }

  addPost(event) {
    event.preventDefault();

    const authorInput = this.shadowRoot.getElementById('author');
    const pesanInput = this.shadowRoot.getElementById('message');

    const author = authorInput.value;
    const message = pesanInput.value;

    const newPost = {
      author: author,
      message: message
    };

    this.posts.push(newPost);

    this.displayPosts();

    // Reset form input
    authorInput.value = '';
    pesanInput.value = '';
  }
}
  
  customElements.define('forum-discussion', ForumDiscussion);
  