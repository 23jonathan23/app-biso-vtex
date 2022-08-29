import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class BisoApi extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions){
       super('http://mt1q8cl1b1.execute-api.us-east-1.amazonaws.com', context, {
           ...options,
           retries: 1,
           headers: {
            "X-Vtex-Use-Https": "true"
           }
       })
    }

    public sendEmail(customerName: string, customerEmail: string): Promise<String> {
        let body = { customerName, customerEmail }
        return this.http.post('/v1/email/send/welcome', body)
    }
}