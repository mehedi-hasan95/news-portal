// Mehedi 

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
        <a class="nav-link fs-5" aria-current="page" href="#" onclick="loadSingleCategories('${category.category_id}')">${category.category_name}</a>
        `
        addCategory.appendChild(div);
    }
}


const loadSingleCategories = async (catId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySingleCategory( data.data );
    } catch (error) {
        displaySingleCategory( error );
    }
}

const displaySingleCategory = allCategories => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';
    allCategories.forEach(cat => {
        const div = document.createElement('div');
        div.classList.add('row', 'p-4', 'mt-4', 'bg-white', 'border-0', 'rounded-3');
        div.innerHTML = `
        <div class="col-md-3 text-center text-md-start">
        <img src="${cat.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title fs-3">${cat.title}</h5>
                <p class="card-text text-dark text-length">${cat.details.slice(0, 400)}</p>
                <div class="d-flex justify-content-between align-items-center flex-wrap g-4">
                    <div class="d-flex">
                        <img src="${cat.author.img}" alt="" class="author-img">
                        <div class="ps-2">
                            <h6>${cat.author.name}</h6>
                            <p>${cat.author.published_date}</p>
                        </div>
                    </div>
                    <h5><i class="fa-regular fa-eye pe-3"></i>${cat.total_view}</h5>
                    <button class="text-primary border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-arrow-right fs-3"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        contentContainer.appendChild(div);
    });
}

loadCategory();