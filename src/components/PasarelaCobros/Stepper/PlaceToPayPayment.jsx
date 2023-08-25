import React, { useContext, useEffect, useState } from 'react'
import { createSession } from '../../../logic/ptp';
import { AppContext } from '../Provider/StateProvider';

const PlaceToPayPayment = () => {
    const { contractData } = useContext(AppContext);
    const [processURL, setProcessURL] = useState(null)

    useEffect(() => {

        window.P.on('response', function (response) {
            console.log(response);
        });

        return () => {
            console.log({ P: window.P })
        }

    }, [])

    return (
        <div>
            <button onClick={async () => {
                console.log(contractData)
                const asd = await createSession({
                    reference: `TEST_${contractData.sale.SO_Number}`,
                    total: contractData.sale.Grand_Total,
                })

                setProcessURL(asd.processUrl)
                console.log({ asd })
            }}>Session</button>

            <button onClick={async () => {
                window.P.init(processURL);
            }}>Payment</button>

        </div>
    )
}

export default PlaceToPayPayment