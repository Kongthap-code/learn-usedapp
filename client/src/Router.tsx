import { Route, Switch } from "wouter";
import { Token } from "./components/app/Marketplace/Marketplace/Token/Token";
import Layout from "./layouts/app/Layout";
import Market from "./views/app/Marketplace";

function Router() {
    return (
        <Route path="/app/:rest*">
            <Layout>
                <Switch>
                    <Route path="/app/marketplace" component={Market} />
                    <Route path="/app/marketplace/token/:tokenId" component={Token} />
                    <Route>404, Not Found!</Route>
                </Switch>
            </Layout>
        </Route>
    )
}

export default Router