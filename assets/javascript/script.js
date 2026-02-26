items = [
  {
    name: "Doner Kebab",
    price: 9.98,
    category: "kebab",
    img: "doner-kebab.png",
  },
  {
    name: "Doner Kebab",
    price: 9.98,
    category: "kebab",
    img: "doner-kebab.png",
  },
  {
    name: "Doner Kebab",
    price: 9.98,
    category: "kebab",
    img: "doner-kebab.png",
  },
  {
    name: "Doner Kebab",
    price: 9.98,
    category: "kebab",
    img: "doner-kebab.png",
  },
  {
    name: "Chicken Kebab",
    price: 11.98,
    category: "kebab",
    img: "chicken-kebab.png",
  },
];

orders = [];

function displayOrder() {
  let orderItems = document.getElementById("order-items");

  orderItems.innerHTML = "";

  orders.forEach((order, index) => {
    let orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `

    <img src="assets/images/${order.img}" alt="Doner" />
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
        <button class="qty-btn"  onclick="decreaseOrder(${index})">&minus;</button>
      </div>
    `;

    orderItems.appendChild(orderCard);
  });
}

function displayItems() {
  let itemsMenu = document.getElementById("items-menu");

  itemsMenu.innerHTML = "";

  items.forEach((item, index) => {
    let foodCard = document.createElement("div");
    foodCard.classList.add("food-card");

    foodCard.innerHTML = `

        <span class="price-tag">£${item.price}</span>
          <img
            src="assets/images/${item.img}"
            alt="${item.name}"
            class="food-img"
          />
          <div class="food-info">
            <h3 id="item-name">${item.name}</h3>
            <button class="add-btn" onclick="addItem(${index})">Add to order</button>
          </div>
    `;

    itemsMenu.appendChild(foodCard);
  });
}

function addItem(index) {
  let orderCount = document.getElementById("order-count");

  let itemArray = items[index];
  itemArray["quantity"] = 1;

  const existingOrder = orders.find(
    (order) => order.name.toLowerCase() === itemArray.name.toLowerCase()
  );

  if (existingOrder) {
    existingOrder.quantity += 1;
  } else {
    orders.push({ ...itemArray });
  }

  orderCount.textContent = orders.length;

  console.log(orders);

  displayOrder();
}

function increaseOrder(index) {
  let item = orders[index];

  item.quantity += 1;

  console.log(item);

  displayOrder();
}

displayOrder();
displayItems();
