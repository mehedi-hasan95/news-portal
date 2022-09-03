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
    loadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // Sorting the most populer Post 
        data.data.sort((a, b) => {
            return b.total_view - a.total_view;
        });
        displaySingleCategory( data.data );
    } catch (error) {
        displaySingleCategory( error );
    }
}

const displaySingleCategory = allCategories => {
    // find the length 
    const theLenght = allCategories.length;
    const findLength = document.getElementById('find-lenth');
    findLength.innerHTML = `${theLenght} items found for this category`;

    // Display all categorys
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
                <p class="card-text text-dark text-length">${cat.details.slice(0, 400) + '...'}</p>
                <div class="d-flex justify-content-between align-items-center flex-wrap g-4">
                    <div class="d-flex">
                        <img src="${cat.author.img}" alt="" class="author-img">
                        <div class="ps-2">
                            <h6>${cat.author.name ? cat.author.name : 'No author'}</h6>
                            <p>${cat.author.published_date ? cat.author.published_date : 'No published date'}</p>
                        </div>
                    </div>
                    <h5><i class="fa-regular fa-eye pe-3"></i>${cat.total_view ? cat.total_view : 'No view'}</h5>
                    <button onclick="loadPost('${cat._id}')" class="text-primary border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-arrow-right fs-3"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        contentContainer.appendChild(div);
    });
    loadingSpinner(false);
}

const loadPost = async postId => {
    const url = `https://openapi.programming-hero.com/api/news/${postId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPost( data.data[0] );
    } catch (error) {
        displayPost( error );
    }
}

const displayPost = posts => {
    const singlePost = document.getElementById('single-post');
    singlePost.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${posts.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card">
                <img src="${posts.thumbnail_url}" class="card-img-top" alt="...">
                <div class="d-flex mt-4 p-2">
                    <img src="${posts.author.img ? posts.author.img : 'No author Image'}" alt="" class="author-img">
                    <div class="ps-2">
                        <h6>Name: ${posts.author.name ? posts.author.name : 'No Author'}</h6>
                        <p>Published: ${posts.author.published_date ? posts.author.published_date : 'No Published date'}</p>
                    </div>
                </div>
                <div class="ps-3">
                    <h6>Badge: ${posts.rating.badge ? posts.rating.badge : 'No rating'}</h6>
                    <p>Rating Number: ${posts.rating.number ? posts.rating.number : 'No rating avilable'}</p>
                </div>
                <div class="card-body">
                <p class="card-text">${posts.details}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    `
}

// load spinner 

const loadingSpinner = isTrue => {
    const isLoad = document.getElementById('load-spinner');
    if (isTrue) {
        isLoad.classList.remove('d-none');
    } else {
        isLoad.classList.add('d-none');
    }
}

loadCategory();