import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"

export const useCarrito = () => {

    const initialCart = () => {
        //inicializar carrito
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }


    const [data] = useState(db)//acá db es un archivo local
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1


    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    /**Funció para agregar producto al carrito */
    function addToCart(item) {
        const itemExists = cart.findIndex(producto => producto.id === item.id)
        if (itemExists >= 0) {//Ya existe en el Carrito
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        } else { //agregando nuevo producto al carrito
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    /**Función para eliminar producto del carrito */
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(producto => producto.id !== id))
    }

    /**Función para incrementar la cantidad de un producto que
     * ya se encuentra en el carrito
     */
    function increaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,//para mantener el elemento en el carro y aumentar su cantidad
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    /**Función para decrementar la cantidad de un producto que
     * ya se encuentra en el carrito
     */
    function decreaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,//para mantener el elemento en el carro y disminuir su cantidad
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    /**función para vaciar carrito */
    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}