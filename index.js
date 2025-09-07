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
  CategoryList.innerHTML = ""; // clear the list first

  // Function to remove highlight from all items
  const clearHighlights = () => {
    document.querySelectorAll("#category-list li").forEach((item) => {
      item.classList.remove("bg-[#15803d]", "text-white");
    });
  };
  const allLi = document.createElement("li");
  allLi.textContent = "All Trees";
  allLi.className =
    "hover:bg-[#15803d] hover:text-white cursor-pointer p-1 transition-colors font-bold";
  allLi.addEventListener("click", () => {
    clearHighlights();
    allLi.classList.add("bg-[#15803d]", "text-white");
  });
  CategoryList.appendChild(allLi);

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat.category_name;
    li.className =
      "hover:bg-[#15803d] hover:text-white cursor-pointer p-1 transition-colors";

    li.addEventListener("click", () => {
      clearHighlights();
      li.classList.add("bg-[#15803d]", "text-white");
    });

    CategoryList.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", loadCategory);
