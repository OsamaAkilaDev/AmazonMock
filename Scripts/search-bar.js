document.querySelector('.amazon-header-middle-section')
.innerHTML =
`
    <input class="search-bar js-search-bar" type="text" placeholder="Developed By Osama Akila">

    <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
    </button>
`;

const searchBar = document.querySelector('.js-search-bar');
searchBar.value = '';
//searchBar.value = localStorage.getItem('search') || '';

document.querySelector('.js-search-button')
.addEventListener('click', () => {
    search();
});

document.querySelector('.js-search-bar')
.addEventListener('keydown', (event) => {
    if (event.key === 'Enter')
        search();
})


function search() {
    const searchContent = searchBar.value;

    localStorage.setItem('search', searchContent);
    window.location.href = `amazon.html?search=${searchContent.toLowerCase()}`;  
}