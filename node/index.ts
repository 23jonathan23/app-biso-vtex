import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { method, LRUCache, Service } from '@vtex/api'

import { Clients } from './clients'
import { send_email } from './middlewares/email'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, never>({ max: 5000 })

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>

  type State = RecorderState
}

export default new Service({
  clients,
  routes: {
    email: method({
      POST: [send_email],
    }),
  }
})