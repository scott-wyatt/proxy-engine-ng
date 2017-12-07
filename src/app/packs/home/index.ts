import { NgPack} from '../../root/ng-pack'
import { ROUTES } from './home.router'
import { ACTIONS } from './home.actions'
import { EFFECTS } from './home.effects'
import { REDUCERS } from './home.reducers'

export class Home extends NgPack {
  constructor(app) {
    super(app, {
      config: {
        name: 'HomeModule',
        root: 'home/home.module'
      },
      actions: ACTIONS,
      effects: EFFECTS,
      reducers: REDUCERS,
      routes: ROUTES
    })
  }
}