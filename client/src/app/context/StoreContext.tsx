import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

//old code file of context, replaced by redux. now we don't need it

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

//creating new hook for StoreContext
export function useStoreContext() {
    const context = useContext(StoreContext);

    if(context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider');
    }

    return context;
}

//creating store provider
export function StoreProvider({children}: PropsWithChildren<any>){
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if(!basket) return;
        const items = [...basket.items]; //when use '...' operator, that makes a copy of array and store it to the variable
        const itemIndex = items.findIndex(i => i.productId === productId);
        if(itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}