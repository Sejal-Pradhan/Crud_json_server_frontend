import React from "react";
import Table from "./Table";
import { deleteData, getData, putData, postData } from "./api";
import { useEffect, useState } from "react";
import ProductForm from "./Form";

const App = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [initialForm, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });
  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    const response = await getData();
    setProducts(response.data);
  }
  async function addProduct(product) {
    let data = {
      name: product.name,
      price: product.price,
      category: product.category,
    };
    if (edit) await putData(product.id, data);
    else await postData(data);
    getAllProducts();
    setOpenForm(false);
  }
  async function deleteProduct(id) {
    await deleteData(id);
    getAllProducts();
  }

  function editProduct(value) {
    setEdit(true);
    setOpenForm(true);
    setForm(value);
  }
  function closeForm() {
    setOpenForm(false);
  }
  function showForm() {
    setForm({ name: "", price: "", category: "" });
    setOpenForm(true);
    setEdit(false);
  }

  return (
    <div className="wrapper m-5 w-100">
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className="content">
        <h2 className="title text-center">CRUD Operations</h2>
        <button
          className="add btn btn-secondary float-end"
          onClick={() => {
            showForm();
          }}
        >
          Add New Product
        </button>
        <Table
          products={products}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        ></Table>
        {openForm && (
          <ProductForm
            addProduct={addProduct}
            data={initialForm}
            closeForm={closeForm}
          ></ProductForm>
        )}
      </div>
    </div>
  );
};

export default App;
