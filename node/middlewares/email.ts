import { BisoApi } from '../clients/externalClient'
import { json } from 'co-body'

export async function send_email(ctx: Context, next: () => Promise<unknown>) {
    const content = await json(ctx.req)

    const url = "http://vnz1l13m92.execute-api.us-east-1.amazonaws.com"

    const data = content.body

    const biso_api = new BisoApi(url, ctx.vtex)

    const response = await biso_api.sendEmail(data)

    if(response?.status && response?.status !== 200) {
        ctx.status = 500
    } else {
        ctx.status = 200
    }
    
  await next()
}