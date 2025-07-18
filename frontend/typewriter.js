const bookTitles = [
  "Harry Potter",
  "Atomic Habits",
  "The Great Gatsby",
  "1984",
  "To Kill a Mockingbird",
  "The Hobbit",
  "Pride and Prejudice",
  "The Catcher in the Rye",
  "Sapiens",
  "The Alchemist"
];

const input = document.getElementById("searchBox");

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriterEffect() {
  const currentTitle = bookTitles[titleIndex];
  let displayText = currentTitle.substring(0, charIndex);
  
  input.setAttribute("placeholder", displayText + (charIndex % 2 === 0 ? "|" : ""));
  
  if (!isDeleting) {
    if (charIndex < currentTitle.length) {
      charIndex++;
    } else {
      isDeleting = true;
      setTimeout(typeWriterEffect, 1500);
      return;
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
    } else {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % bookTitles.length;
    }
  }
  
  setTimeout(typeWriterEffect, isDeleting ? 50 : 100);
}

typeWriterEffect();












