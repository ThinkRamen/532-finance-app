import { SectionCard } from "./SectionCard";

export const WelcomeSection = () => {
    return (
        < section class='min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900' >
            <SectionCard class='max-w-2xl'>
                <h1 class='text-3xl font-bold text-green-400 mb-4'>
                    💰 532 NET WORTH PROJECTION
                </h1>
                <h2 class='text-gray-300 mb-6'>
                    Start Building Your Financial Future!!!
                </h2>
                <div class='p-6 rounded-lg text-center'>
                    <h3 class='text-lg font-semibold mb-4'>
                        Welcome To Your Financial Dashboard
                    </h3>
                    <p class='text-gray-400 mb-4 text-justify'>
                        This app will help you visualize and plan your net worth growth
                        using the 50/30/20 budgeting strategy. It's great! The 50/30/20 rule is 1 budgeting guideline that suggests that you should allocate 50% of your after-tax income towards your essential expenses, 30% towards discretionary expenses, and 20% towards savings and debt repayment.
                    </p>
                    <div class="flex flex-col justify-center items-center">
                        <button
                            class='pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-2 w-full'
                            onClick={() => document.getElementById('income')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                        </button>
                        <span class='py-2 text-gray-400'>OR</span>
                        <button
                            class='pixel-btn px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg w-full'
                        >
                            Login
                        </button>
                    </div>
                </div>
            </SectionCard>
        </section >
    )
}
