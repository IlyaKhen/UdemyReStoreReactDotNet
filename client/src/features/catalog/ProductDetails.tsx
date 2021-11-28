import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const {basket} = useStoreContext();
    const { id } = useParams() as {
        id: string;
    };
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submittung, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <LoadingComponent message='Loading product...'/>

    if (!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant='h4' color='secondary'>{currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}