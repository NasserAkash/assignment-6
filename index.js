const CategoryList = document.getElementById("category-list");

const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    const categories = data.categories;
    showCategory(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

const showCategory = (categories) => {
  CategoryList.innerHTML = "";
  const clearHighlights = () => {
    document.querySelectorAll("#category-list li").forEach((item) => {
      item.classList.remove("bg-[#15803d]", "text-white");
    });
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

document.addEventListener("DOMContentLoaded", loadCategory);


const plantCategory = document.getElementById("card-container");

const loadPlantsbyCategory = (catId) => {
  console.log(catId);
  fetch(`https://openapi.programming-hero.com/api/category/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantsbyCategory(data.plants);
    });
};


const showPlantsbyCategory = (plants) => {
  plantCategory.innerHTML = "";
  plants.forEach((plant) => {
    plantCategory.innerHTML += `
      <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col">

           <div class="w-[250px] h-[200px] mx-auto rounded-lg overflow-hidden">
            <img src="${plant.image}" alt="" />
            </div>

            <h2 class="mt-4 font-semibold text-lg">${plant.name}</h2>
            <p class="text-sm text-gray-600 mt-1">
              ${plant.description}
            </p>

            <div class="flex justify-between items-center mt-3">
              <span
                class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
                >${plant.category}</span
              >
              <span class="font-medium">৳${plant.price}</span>
            </div>

            <button id="${plant.id}"
              class="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
            >
              Add to Cart
            </button>
          </div>`;
  });}

const allTreesBtn = document.getElementById("allTrees");

const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showPlantsbyCategory(data.plants);
    })
    .catch((err) => console.error("❌ Error loading all plants:", err));
};
allTreesBtn.addEventListener("click", loadAllPlants);

  document.addEventListener("DOMContentLoaded", loadAllPlants);



  





