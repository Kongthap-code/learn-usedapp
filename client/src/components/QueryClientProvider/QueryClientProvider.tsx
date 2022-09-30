import { QueryClientProvider as QueryProvider,QueryClient } from '@tanstack/react-query'

export function QueryClientProvider(props: any) {
    const queryClient = new QueryClient()
    return (
        <QueryProvider client={queryClient}>
            {props.children}
        </QueryProvider>
    )
}