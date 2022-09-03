const loadCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaCategory( data.data.news_category );
    } catch (error) {
        displaCategory( error );
    }
}

const displaCategory = categorys => {
    const addCategory = document.getElementById('add-category');
    for (const category of categorys) {
        const div = document.createElement('li');
        div.classList.add('nav-item')
        div.innerHTML = `
        <a class="nav-link fs-5" aria-current="page" href="#">${category.category_name}</a>
        `
        addCategory.appendChild(div);
    }
}

loadCategory();