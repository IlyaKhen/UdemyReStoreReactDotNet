import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

//import { Fragment } from "react"; <Fragment></Fragment> or we can just use <></> - same as fragment

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    }, []) //effect callback and second param is dependency empty array (with dependency this method will be called only once)

    if(loading) return <LoadingComponent message='Loading products...'/>
  
    return (
        <>
            <ProductList products={products} />
        </>
    )
}