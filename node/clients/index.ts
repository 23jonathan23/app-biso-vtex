import { IOClients } from '@vtex/api'
import BisoApi from './bisoApi'

export class Clients extends IOClients {
    public get bisoApi() {
        return this.getOrSet('bisoApi', BisoApi)
    }
}
