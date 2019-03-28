const books = document.querySelectorAll('tbody tr');
const list = document.querySelectorAll('tbody tr').length;
const ul = document.createElement('ul')
const pages = Math.ceil(list / 10);
const pageDiv = document.querySelector('.pagination')


/* SET UP PAGE LINKS
====================*/
const appendPageLinks = (list) => {
  if (pages > 1){
    for (let i = 0; i < pages; i++){
      const li = document.createElement('li');
      const pageNumber = document.createElement('a');
      pageNumber.className = 'page-link'
      const page = document.getElementsByClassName('page-link')
      pageNumber.textContent = i + 1;
      pageNumber.textContent == 1 ? pageNumber.className = 'page-link active' : 'page-link';
      li.appendChild(pageNumber);
      ul.appendChild(li);
      pageDiv.appendChild(ul);
      
      pageNumber.addEventListener('click', (e) => {
        for (let i = 0; i < pages; i++){
          page[i].className = 'page-link';
        };
        pageNumber.className ='page-link active'
        
        showPage(list, Number(e.target.text));
        
      });
    };
  };
};


/* DISPLAY BOOKS
===================*/
const showPage = (list, page) => {
   
  const firstBook = (page * 10) - 10;
  const lastBook = (page * 10);

  // Clear students from page
  showBooks(0, list, 'none');
  // console.log(lastBook, list)
  // Display ten students per page and remaining on last page
    if (lastBook > list){
      showBooks(firstBook, list, '')
    }else{
      showBooks(firstBook, lastBook, '')
    }
  // lastBook > list ? showBooks(firstBook, list, 'block') : showBooks(firstBook, lastBook, 'block');

};

const showBooks = (start, end, display) => {
  for (let i = start; i < end; i++){
     books[i].style.display = display;
  };
};


// Show first ten books on main page
showBooks(10, list, 'none')

// Organize list of books into seperate pages
appendPageLinks(list)

