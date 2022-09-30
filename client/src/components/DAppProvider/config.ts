//import.meta.env.VITE_API_URL

import { Rinkeby } from "@usedapp/core";

const config = {
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
        [Rinkeby.chainId]:
            "https://rinkeby.infura.io/v3/f933a8ccfb914428b8fd691e3dcc2f25",
    },
};

export default config