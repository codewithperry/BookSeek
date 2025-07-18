
q = window.location.search;

value = new URLSearchParams(q)
reqValue = value.get("bookname")
userQuery = encodeURIComponent(reqValue)


async function main() {
  const response = await fetch("https://bookseekbackend.onrender.com/api/books?bookname=" + userQuery);

  const data = await response.json();
  const results = document.querySelector('.feed');

  if (data.items) {
    data.items.forEach(book => {
      const info = book.volumeInfo;
      const bookDiv = document.createElement('div');


      if (info.imageLinks && info.imageLinks.smallThumbnail) {
        const img = document.createElement('img');
        img.src = info.imageLinks.smallThumbnail;
        img.alt = "Book cover";
        bookDiv.appendChild(img);
      }


      const infoDiv = document.createElement('div');
      infoDiv.classList.add('book-info');

      if (info.title) infoDiv.innerHTML += `<h2>${info.title}</h2>`;
      if (info.subtitle) infoDiv.innerHTML += `<h3>${info.subtitle}</h3>`;
      if (info.authors) infoDiv.innerHTML += `<p><strong>Authors:</strong> ${info.authors.join(', ')}</p>`;
      if (info.publishedDate) infoDiv.innerHTML += `<p><strong>Published:</strong> ${info.publishedDate}</p>`;
      if (info.averageRating !== undefined) infoDiv.innerHTML += `<p><strong>Rating:</strong> ${info.averageRating}</p>`;
      if (info.ratingsCount !== undefined) infoDiv.innerHTML += `<p><strong>Reviews:</strong> ${info.ratingsCount}</p>`;
      if (info.categories) infoDiv.innerHTML += `<p><strong>Categories:</strong> ${info.categories.join(', ')}</p>`;
      if (info.industryIdentifiers) {
        info.industryIdentifiers.forEach(id => {
          infoDiv.innerHTML += `<p><strong>${id.type}:</strong> ${id.identifier}</p>`;
        });
      }
      if (info.previewLink) infoDiv.innerHTML += `<p><a href="${info.previewLink}" target="_blank">Preview</a></p>`;
      if (info.infoLink) infoDiv.innerHTML += `<p><a href="${info.infoLink}" target="_blank">More Info</a></p>`;

      bookDiv.appendChild(infoDiv);
      results.appendChild(bookDiv);
    });
  } else {
    results.textContent = "No books found.";
  }
}
main();
