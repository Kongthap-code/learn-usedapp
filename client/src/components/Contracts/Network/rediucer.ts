import { Network, UpdateNetwork } from "./model"

export function networkReducer(prevState: Network, actions: UpdateNetwork): Network {
    switch (actions.type) {
      case 'UPDATE_NETWORK':
        return {
          ...prevState,
          ...actions.network,
        }
      default:
        return prevState
    }
  }