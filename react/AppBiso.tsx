import React, { useState, useEffect } from 'react'

import './AppBiso.css'

import { Modal } from 'vtex.styleguide'
import { useFullSession } from 'vtex.session-client'

import { sendEmail } from './services/emailService'

const AppBiso = (): JSX.Element => {
    const { loading, data } = useFullSession()

    const [showModal, setShowModal] = useState(false)
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")

    const handleCloseModal = async () => {
        try {
            setShowModal(false)

            await sendEmail(customerName, customerEmail)

            window.localStorage.setItem('isFirstAccessBisoApp', 'false')
        } catch (error) {/*ignore error*/ }
    }

    useEffect(() => {
        const customerSession: any = data?.session

        const customerName = customerSession?.namespaces?.account?.accountName?.value
        const customerEmail = customerSession?.namespaces?.authentication?.adminUserEmail?.value

        setCustomerName(customerName)
        setCustomerEmail(customerEmail)

        const isFirstAccess = window.localStorage.getItem('isFirstAccessBisoApp');

        if (!isFirstAccess) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [loading])

    return (
        <>
            <iframe src="https://app.biso.digital" title="App Biso">
                {!loading &&
                    <Modal
                        centered
                        isOpen={showModal}
                        onClose={handleCloseModal}>
                        <div className="dark-gray">
                            <p>Olá <strong>{customerName}</strong>,</p>
                            <p>
                                Seja bem-vindx a Biso!
                            </p>
                            <p>
                                Para a gente, é uma alegria ter você para se unir ao nosso universo. Vamos juntos impulsionar e inovar o mundo digital.
                            </p>
                            <p>
                                Em breve você receberá um e-mail para agendar uma reunião que dará início a nossa jornada juntos e receber os acessos da plataforma.
                            </p>
                            <p>
                                Caso queira se adiantar, separamos algumas perguntas (leva 4 minutos!) para entendermos melhor quais necessidades você busca solucionar com a nossa plataforma e te oferecer um atendimento ainda mais personalizado:<span> </span>
                                <a href='https://bit.ly/3Ih0Gfe' target="_blank" style={{ color: 'rgb(249, 12, 104)' }}>clique aqui</a>
                            </p>
                            <p>
                                Prepare-se para transformar os seus dados em informações relevantes que aumentaram o faturamento do seu negócio!
                            </p>
                        </div>
                    </Modal>
                }
            </iframe>
        </>
    )
}

export default AppBiso