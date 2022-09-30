import { DAppProvider as DApp } from '@usedapp/core'
import config from './config'

function DAppProvider(props : any) {
    return (
        <DApp config={config}>
            {props.children}
        </DApp>
    )
}

export default DAppProvider