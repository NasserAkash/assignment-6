const CategoryList = document.getElementById("category-list");
const plantCategory = document.getElementById("card-container");
const allTreesBtn = document.getElementById("allTrees");
const spinner = document.getElementById("loadingSpinner");


function showSpinner() {
  spinner.classList.remove("hidden");
}
function hideSpinner() {
  spinner.classList.add("hidden");
}


function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch(err => {
      console.error("Error fetching categories:", err);
    });
}


const showCategory = (categories) => {
  CategoryList.innerHTML = "";

  const clearHighlights = () => {
    document.querySelectorAll("#category-list li").forEach((item) => {
      item.classList.remove("bg-[#15803d]", "text-white");
    });
    allTreesBtn.classList.remove("bg-[#15803d]", "text-white");
  };

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat.category_name;
    li.id = `${cat.id}`;
    li.className =
      "hover:bg-[#15803d] hover:text-white cursor-pointer p-1 transition-colors";

    li.addEventListener("click", () => {
      clearHighlights();
      li.classList.add("bg-[#15803d]", "text-white");
      loadPlantsbyCategory(cat.id);
    });

    CategoryList.appendChild(li);
  });
};


const loadPlantsbyCategory = (catId) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantsbyCategory(data.plants);
    })
    .finally(() => hideSpinner());
};

const loadAllPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showPlantsbyCategory(data.plants);
    })
    .catch((err) => console.error("❌ Error loading all plants:", err))
    .finally(() => hideSpinner());
};


const showPlantsbyCategory = (plants) => {
  plantCategory.innerHTML = "";
  plants.forEach((plant) => {
    plantCategory.innerHTML += `
      <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
        <div class="w-[250px] h-[200px] mx-auto rounded-lg overflow-hidden">
          <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover"/>
        </div>
        <h2 class="mt-4 font-semibold text-lg text-green-700 cursor-pointer hover:underline"
          onclick='openModal(${JSON.stringify(plant)})'>${plant.name}</h2>
        <p class="text-sm text-gray-600 mt-1">${plant.description}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            ${plant.category}
          </span>
          <span class="font-medium">৳${plant.price}</span>
        </div>
        <button 
  onclick='addToCart(${JSON.stringify(plant)})'
  class="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full">
  Add to Cart
</button>
      </div>
    `;
  });
};


const modal = document.getElementById("treeModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");

function openModal(plant) {
  modalContent.innerHTML = `
    <div class="text-center">
      <img src="${plant.image}" alt="${plant.name}" class="w-[200px] h-[180px] mx-auto rounded-lg object-cover mb-4"/>
      <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
      <p class="text-gray-600 mb-3">${plant.description}</p>
      <p class="text-green-700 font-semibold">Category: ${plant.category}</p>
      <p class="text-lg font-bold">৳${plant.price}</p>
    </div>
  `;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});


allTreesBtn.addEventListener("click", () => {
  loadAllPlants();


  document.querySelectorAll("#category-list li").forEach((item) => {
    item.classList.remove("bg-[#15803d]", "text-white");
  });
  allTreesBtn.classList.add("bg-[#15803d]", "text-white");
});

document.addEventListener("DOMContentLoaded", () => {
  loadCategory();
  loadAllPlants(); 
  allTreesBtn.classList.add("bg-[#15803d]", "text-white"); // highlight default
});





const cartItemsContainer = document.getElementById("cartItems");
const emptyCartMsg = document.getElementById("emptyCart");
const cartTotal = document.getElementById("cartTotal");

let cart = [];
let total = 0;

function addToCart(plant) {
  if (emptyCartMsg) emptyCartMsg.style.display = "none";

  cart.push(plant);
  total += plant.price;

  alert(`${plant.name} added to cart! Price: ৳${plant.price}`);

  renderCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p id="emptyCart">No items yet</p>`;
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md";

    
      li.innerHTML = `
        <span>${item.name} - ৳${item.price}</span>
        <button class="text-red-500 hover:text-red-700 font-bold">❌</button>
      `;

      li.querySelector("button").addEventListener("click", () => {
        removeFromCart(index);
      });

      cartItemsContainer.appendChild(li);
    });
  }

  cartTotal.textContent = `৳${total}`;
}