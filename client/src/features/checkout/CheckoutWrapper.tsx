import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51K7I6BC5upDwoKrJSOp2kPy2MIJZ4sYQOE1CAXO3hkpt0E5lk3Wg5PK2F2kXbZ02mGyjNizz1S5M7iWZUTUPsFvs00ziLxfk1O');

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message='loading checkout...' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    ) 
}