import { fetchBooksByCategory, fetchBookDetails } from './api.js';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookList = document.getElementById('bookList');
const bookDetails = document.getElementById('bookDetails');

searchBtn.addEventListener('click', async () => {
  const category = searchInput.value.trim().toLowerCase();

  if (!category) {
    alert('Please enter a genre!');
    return;
  }

  document.getElementById('loader').style.display = 'block';
  bookList.innerHTML = '';
  bookDetails.innerHTML = '';

  const books = await fetchBooksByCategory(category);

  document.getElementById('loader').style.display = 'none';

  if (books.length === 0) {
    bookList.innerHTML = 'No books found.';
    return;
  }

  displayBookList(books);
});

function displayBookList(books) {
  bookList.innerHTML = '';

  books.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('book');
    div.textContent = `${book.title} - Autori: ${book.authors.map(a => a.name).join(', ')}`;

    div.addEventListener('click', async () => {
      const details = await fetchBookDetails(book.key);
      showBookDetails(details);
    });

    bookList.appendChild(div);
  });
}

function showBookDetails(details) {
  const description = typeof details.description === 'object'
    ? details.description.value
    : details.description || 'No description available.';

  bookDetails.innerHTML = `
    <h3>${details.title}</h3>
    <p>${description}</p>
  `;
}

