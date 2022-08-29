import axios from 'axios'

const sendEmail = async (customerName: string, customerEmail: string) => {
    const data = {
        customerName,
        customerEmail
    }

    const response = await axios.post('/email/send', {
        body: JSON.stringify(data)
    });

    if(response.status !== 200) {
        throw new Error('Error sending email')
    }
}

export { sendEmail }