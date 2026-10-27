import { BarberLogo } from "@/controllers";

export function PublicPagesLayout({
    children,
    headerText
}: {
    children?: React.ReactNode;
    headerText?: string;
}) {
    return (
        <main
            role="main"
            className="p-6 h-screen flex flex-col items-center justify-center font-sans text-cream"
        >
            <div className="w-full max-w-lg lg:p-4 h-[95%] rounded-lg lg:border border-gold/25">
                <header className="mb-10 flex flex-col items-center">
                    <BarberLogo className="mb-4 w-18 h-18 text-gold" />
                    <h1 className="mb-1 text-3xl font-semibold">BarberControl</h1>
                    <p className="tracking-wide text-sm text-gold uppercase">{headerText}</p>
                </header>

                <section
                    className="w-full"
                    aria-labelledby="login-heading"
                >
                    { children }
                </section>
            </div>
        </main>
    );
}