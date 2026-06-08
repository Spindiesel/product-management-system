const API_URL =
"http://localhost:8080/api/products";

let editingId = null;

const form =
document.getElementById("productForm");

form.addEventListener("submit", addProduct);

async function addProduct(e){

    e.preventDefault();

    const product = {

        productName:
            document.getElementById("name").value,

        productDescription:
            document.getElementById("description").value,

        productCategory:
            document.getElementById("category").value,

        productPrice:
            document.getElementById("price").value
    };

   const url = editingId
    ? `${API_URL}/${editingId}`
    : API_URL;

const method = editingId
    ? "PUT"
    : "POST";

await fetch(url,{
    method: method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
    });

    form.reset();
    editingId = null;

    loadProducts();
}

async function loadProducts(){

    const response =
        await fetch(API_URL);

    const products =
        await response.json();

    let rows = "";

    products.forEach(product => {

        rows += `
        <tr>
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productDescription}</td>
            <td>${product.productCategory}</td>
            <td>₹${product.productPrice}</td>

            <td>
    <button
    onclick="editProduct(${product.productId})">
        Edit
    </button>

    <button
    class="delete-btn"
    onclick="deleteProduct(${product.productId})">
        Delete
    </button>
</td>
        </tr>
        `;
    });

    document.getElementById("productTable")
        .innerHTML = rows;
}

async function deleteProduct(id){

    await fetch(`${API_URL}/${id}`,{
        method:"DELETE"
    });

    loadProducts();
}
async function editProduct(id){

    const response =
        await fetch(`${API_URL}/${id}`);

    const product =
        await response.json();

    document.getElementById("name").value =
        product.productName;

    document.getElementById("description").value =
        product.productDescription;

    document.getElementById("category").value =
        product.productCategory;

    document.getElementById("price").value =
        product.productPrice;

    editingId = id;
}

loadProducts();