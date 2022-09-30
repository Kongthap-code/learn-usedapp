import Font from "@/components/Font"
import Header from "@/components/app/Header/Header"

function Layout(props : any) {
    return (
        <>
            <Font />
            <Header />
            {props.children}
        </>
    )
}

export default Layout