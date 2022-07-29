import axios from "axios";
import { useEffect, useState } from "react";

const OrderManager = () => {
    const [listOrder, setListOrder] = useState([]);

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:5000/api/v1/order',{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return ( 
        <>
            adsaasd
        </>
     );
}
 
export default OrderManager;