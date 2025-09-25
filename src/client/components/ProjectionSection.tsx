import { SectionCard } from "./SectionCard"

export const ProjectionSection = () => {
    return (
        <section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="projection" >
            <SectionCard class='max-w-2xl'>
                <h1 class='text-3xl font-bold text-green-400 mb-4'>
                    📈 NET WORTH PROJECTION
                </h1>
                <h2 class='text-gray-300 mb-6'>
                    See How Your Net Worth Can Grow Over Time
                </h2>
                <p class='text-gray-400 mb-4 text-justify'>
                    Based on your income, assets, liabilities, and the 50/30/20 budgeting strategy,
                    this section will project your net worth growth over time. Visualize how consistent
                    saving and investing can lead to financial freedom.
                </p>
                <div class="p-6 rounded-lg text-center">
                    <button
                        class='pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-2 w-full'
                    >
                        View Projection
                    </button>
                </div>
            </SectionCard>
        </section>
    )
}
