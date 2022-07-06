import React, { useState, useEffect } from 'react'

import './AppBisoDigital.css'

import { Modal } from 'vtex.styleguide'
import { useFullSession } from 'vtex.session-client'

import { sendEmail } from './services/emailService'

const AppBisoDigital = () : JSX.Element => {
    const { loading, data } = useFullSession()

    const [showModal, setShowModal] = useState(false)
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")

    const handleCloseModal = async () => {
        try {
            await sendEmail(customerName, customerEmail)

            window.localStorage.setItem('isFirstAccessBisoDigitalApp', 'false')
        }catch(error) {/*ignore error*/}

        setShowModal(false)
    }

    useEffect(() => {
        const customerSession: any = data?.session

        const customerName = customerSession?.namespaces?.account?.accountName?.value
        const customerEmail = customerSession?.namespaces?.authentication?.adminUserEmail?.value

        setCustomerName(customerName)
        setCustomerEmail(customerEmail)

        const isFirstAccess = window.localStorage.getItem('isFirstAccessBisoDigitalApp');

        if (!isFirstAccess) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [loading])

    return (
        <>
            <iframe src="https://app.biso.digital" title="App Biso Digital">
                {!loading &&
                    <Modal
                        centered
                        isOpen={showModal}
                        onClose={handleCloseModal}>
                        <div className="dark-gray">
                            <p>
                                Olá <strong>{customerName}</strong>!
                            </p>

                            <p>
                            Seja muito bem vindo a Biso Digital, daqui em diante você deve aguardar que nosso time entrará em contato com você para que possamos acertar os detalhes e fazer as devidas configurações.
                            </p>
                            <div
                            style={{
                                backgroundColor: '#edf4fa',
                                borderRadius: '4px',
                                border: 'solid rgb(249, 12, 104)',
                                borderWidth: '0 0 0 4px',
                                boxSizing: 'border-box',
                                padding: '12px 16px',
                            }}>
                            Prepare-se para acelerar o seu negócio empreendedor!
                            </div>
                        </div>
                    </Modal>
                }
            </iframe>
        </>
    )
}

export default AppBisoDigital