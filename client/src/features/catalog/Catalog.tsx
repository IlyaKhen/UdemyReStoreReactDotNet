import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

//import { Fragment } from "react"; <Fragment></Fragment> or we can just use <></> - same as fragment

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/products')
        .then(responce => responce.json())
        .then(data => setProducts(data))
    }, []) //effect callback and second param is dependency empty array (with dependency this method will be called only once)
  
/*     function addProduct() {
      setProducts(prevState => [...prevState,
      {
        id: prevState.length + 101,
        name: 'product' + (prevState.length + 1),
        price: (prevState.length * 100) + 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://pic'
      }]);
    } */

    return (
        <>
            <ProductList products={products} />
            {/* <Button variant='contained' onClick={addProduct}>Add Product</Button> */}
        </>
    )
}