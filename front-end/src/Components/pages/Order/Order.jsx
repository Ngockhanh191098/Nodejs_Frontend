import axios from "axios";
import { useEffect } from "react";
import { OrderAPI } from "../../../API/API";

const Order = () => {

    const idUser = localStorage.getItem('idUser')

    useEffect(() => {
        axios.get(
            `${OrderAPI.ORDER_API}/${idUser}`,
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return ( 
        <>
            Order page
        </>
     );
}
 
export default Order;