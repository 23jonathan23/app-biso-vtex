import { json } from 'co-body'

export async function biso(ctx: Context) {
  const {
    clients: { bisoApi },
  } = ctx

  const content = await json(ctx.req)
  const data = JSON.parse(content.body)

  ctx.status = 200
  ctx.body = await bisoApi.sendEmail(data.customerName, data.customerEmail)
  
  ctx.set('cache-control', 'no-cache')
}
