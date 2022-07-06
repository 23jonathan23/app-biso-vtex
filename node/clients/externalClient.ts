import { ExternalClient } from '@vtex/api'

export class BisoApi extends ExternalClient {
    public async sendEmail(body: any): Promise<any> {
        const response = await this.http.post("/dev/email/send/welcome", {
            headers: {
                "X-VTEX-Use-Https": "true",
                "Proxy-Authorization": this.context.authToken
            },
            data: body
        }) 

        return response
    }
}