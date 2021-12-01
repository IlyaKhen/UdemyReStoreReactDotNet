import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

//import { Fragment } from "react"; <Fragment></Fragment> or we can just use <></> - same as fragment

export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]) //effect callback and second param is dependency [also can be as empty array] (with dependency this method will be called only once)

    if(status.includes('pending')) return <LoadingComponent message='Loading products...'/>
  
    return (
        <>
            <ProductList products={products} />
        </>
    )
}