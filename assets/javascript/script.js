items = [
  // 🌯 Kebabs
  {
    name: "Doner Kebab",
    price: 8.99,
    category: "kebab",
    img: "doner-kebab.png",
  },
  {
    name: "Chicken Kebab",
    price: 9.49,
    category: "kebab",
    img: "chicken-kebab.png",
  },
  {
    name: "Lamb Kebab",
    price: 9.99,
    category: "kebab",
    img: "lamb-kebab.png",
  },
  {
    name: "Mixed Kebab",
    price: 10.99,
    category: "kebab",
    img: "mixed-kebab.png",
  },

  // 🍕 Pizzas
  {
    name: "Margherita Pizza",
    price: 8.49,
    category: "pizza",
    img: "margherita-pizza.png",
  },
  {
    name: "Pepperoni Pizza",
    price: 9.49,
    category: "pizza",
    img: "pepperoni-pizza.png",
  },
  {
    name: "BBQ Chicken Pizza",
    price: 10.49,
    category: "pizza",
    img: "bbq-chicken-pizza.png",
  },
  {
    name: "Meat Feast Pizza",
    price: 11.49,
    category: "pizza",
    img: "meat-feast-pizza.png",
  },

  // 🥤 Drinks
  {
    name: "Coca-Cola",
    price: 1.99,
    category: "drink",
    img: "coca-cola.png",
  },
  {
    name: "Fanta",
    price: 1.99,
    category: "drink",
    img: "fanta.png",
  },
  {
    name: "Sprite",
    price: 1.99,
    category: "drink",
    img: "sprite.png",
  },
  {
    name: "Still Water",
    price: 1.49,
    category: "drink",
    img: "water.png",
  },

  // 🍟 Sides
  {
    name: "Chips",
    price: 3.49,
    category: "side",
    img: "chips.png",
  },
  {
    name: "Garlic Bread",
    price: 3.99,
    category: "side",
    img: "garlic-bread.png",
  },
  {
    name: "Onion Rings",
    price: 3.79,
    category: "side",
    img: "onion-rings.png",
  },
  {
    name: "Chicken Nuggets",
    price: 4.49,
    category: "side",
    img: "chicken-nuggets.png",
  },
];

orders = [];
let searchQuery = "";
let currentCategory = "all";

function orderNumberGen() {
  orderNo = document.getElementById("order-number");

  orderNo.textContent = Math.floor(Math.random() * 150);

  return orderNo;
}

function setOrderType(type, element) {
  const buttons = document.querySelectorAll(".type-pill");
  buttons.forEach((btn) => btn.classList.remove("active"));

  element.classList.add("active");

  console.log("Selected order type:", type);
}

function handleSearch() {
  const input = document.getElementById("search-input");
  searchQuery = input.value.toLowerCase();
  displayItems();
}

function filterByCategory(category, element) {
  currentCategory = category;

  document.querySelectorAll(".top-nav nav a").forEach((link) => {
    link.classList.remove("active");
  });
  element.classList.add("active");

  displayItems();
}

function displayOrder() {
  let orderItems = document.getElementById("order-items");
  totalPrice = document.getElementById("total-price");

  orderItems.innerHTML = "";
  let totalAccumulator = 0;

  orders.forEach((order, index) => {
    let itemTotalPrice = order.price * order.quantity;

    totalAccumulator += itemTotalPrice;

    let orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `

    <img src="assets/images/item-images/${order.img}" alt="${order.name}" />
    <div class="order-details">
      <h4>${order.name}</h4>
      <p>Price : £${order.price}</p>
    </div>
    <div class="order-actions">
      <a href="#" class="remove-link" onclick="removeOrder(${index})"
        ><img src="assets/images/bin.png" alt="" />Remove</a
      >
      <div class="qty-controls">
        <button class="qty-btn"  onclick="increaseOrder(${index})">&plus;</button>
        <span class="qty-val">${order.quantity}</span>
        <button class="qty-btn" onclick="decreaseOrder(${index})" ${
      order.quantity === 1 ? "disabled" : ""
    }>&minus;</button>
      </div>
    `;

    orderItems.appendChild(orderCard);
  });

  totalPrice.textContent = `£${totalAccumulator.toFixed(2)}`;
}

function displayItems() {
  let itemsMenu = document.getElementById("items-menu");
  itemsMenu.innerHTML = "";

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  filteredItems.forEach((item) => {
    const originalIndex = items.findIndex((i) => i.name === item.name);

    let foodCard = document.createElement("div");
    foodCard.classList.add("food-card");

    foodCard.innerHTML = `
        <span class="price-tag">£${item.price.toFixed(2)}</span>
          <img
            src="assets/images/item-images/${item.img}"
            alt="${item.name}"
            class="food-img"
          />
          <div class="food-info">
            <h3 id="item-name">${item.name}</h3>
            <button class="add-btn" onclick="addItem(${originalIndex})">Add to order</button>
          </div>
    `;

    itemsMenu.appendChild(foodCard);
  });
}

function addItem(index) {
  if (orders.length === 0) {
    orderNumberGen();
  }

  let itemArray = items[index];
  itemArray["quantity"] = 1;

  const existingOrder = orders.find(
    (order) => order.name.toLowerCase() === itemArray.name.toLowerCase()
  );

  if (existingOrder) {
    existingOrder.quantity += 1;
  } else {
    orders.push({ ...itemArray, quantity: 1 });
  }

  updateItemsCount();

  displayOrder();
}

function increaseOrder(index) {
  let item = orders[index];

  item.quantity += 1;

  displayOrder();
}

function decreaseOrder(index) {
  let item = orders[index];

  if (item.quantity >= 2) {
    item.quantity -= 1;
  }

  displayOrder();
}

function removeOrder(index) {
  orders.splice(index, 1);

  updateItemsCount();

  displayOrder();
}

function updateItemsCount() {
  let orderCount = document.getElementById("order-count");
  orderCount.textContent = orders.length;
}

function printOrder() {
  if (orders.length === 0) return;

  const orderNum = document.getElementById("order-number").textContent;
  const totalPrice = document.getElementById("total-price").textContent;

  let fileContent = `--- KEBAB KINGS RECEIPT ---\n`;
  fileContent += `Order Number: #00${orderNum}\n`;
  fileContent += `Date: ${new Date().toLocaleString()}\n`;
  fileContent += `---------------------------\n\n`;

  orders.forEach((item) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    fileContent += `${item.quantity}x ${item.name} - £${itemTotal}\n`;
  });

  fileContent += `\n---------------------------\n`;
  fileContent += `TOTAL PRICE: ${totalPrice}\n`;
  fileContent += `---------------------------\n`;
  fileContent += `Thank you for your order!`;

  const blob = new Blob([fileContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `Order_${orderNum}.txt`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function confirmBtn() {
  if (orders.length > 0) {
    printOrder();
    alert("Order Confirmed!");
    orders = [];
    displayOrder();
    updateItemsCount();

    document.getElementById("order-number").textContent = "---";
  } else {
    alert("Add an Item to Order List!!!");
  }
}

displayOrder();
displayItems();
