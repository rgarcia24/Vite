import React, { useState } from 'react'
import { Eye } from "tabler-icons-react"

import "./styles.css"
const CheckoutComp = ({ site, product, size, orderNum, showAll }) => {

    const [showOrder, setShowOrder] = useState(false)

    const copyOrderNum = () => {
        navigator.clipboard.writeText(orderNum)
    }

    return (
        <tr key={orderNum} className="checkout-comp">
            <td>{site}</td>
            <td className='prod-name'>{((product).length > 21) ?
                (((product).substring(0, 21 - 3)) + '...') :
                product}</td>
            <td>{size}</td>
            {showOrder || showAll
                ? <td onClick={() => copyOrderNum(orderNum)} style={{ cursor: "pointer" }}>
                    {((orderNum).length > 12)
                        ? (((orderNum).substring(0, 12 - 3)) + '...')
                        : orderNum

                    }
                </td>
                : <td>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</td>
            }
            <td>
                <Eye
                    style={{ cursor: "pointer" }}
                    size={20}
                    onClick={() => setShowOrder(!showOrder)}
                />
            </td>
        </tr>
    )
}

export default CheckoutComp