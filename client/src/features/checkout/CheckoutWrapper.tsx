import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51K7I6BC5upDwoKrJSOp2kPy2MIJZ4sYQOE1CAXO3hkpt0E5lk3Wg5PK2F2kXbZ02mGyjNizz1S5M7iWZUTUPsFvs00ziLxfk1O');

export default function CheckoutWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    ) 
}