import React, { useContext, useState } from 'react'
import GlobalsContext from '../../services/GlobalsContext';
import { Eye } from "tabler-icons-react"


import './recentCheckouts.css'
import CheckoutComp from '../checkoutComp';



const recentCheckouts = () => {
    const { checkouts } = useContext(GlobalsContext)
    const [showAll, setShowAll] = useState(false)



    return (
        <div className='recent-checkouts'>
            <div className='header-div'>

                <h1 className='recentCheckouts-header'>Recent Checkouts ({checkouts.length})</h1>

            </div>
            <div className='tableCheckouts-table'>
                <table className='recentCheckouts-table' cellSpacing="0" cellPadding="0">
                    <thead className='checkouts-tableHeadings'>
                        <tr>
                            <th>Site</th>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Order #</th>
                            <th >
                                <Eye
                                    style={{ cursor: "pointer" }}
                                    size={20}
                                    onClick={() => setShowAll(!showAll)}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {checkouts.map(checkout => {
                            return (
                                <CheckoutComp
                                    site={checkout.site}
                                    product={checkout.product}
                                    size={checkout.size}
                                    orderNum={checkout.OrderNum}
                                    showAll={showAll}
                                    image={checkout.image}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default recentCheckouts
