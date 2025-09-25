import { SectionCard } from "./SectionCard";

export const WelcomeSection = () => {
    return (
        <section class='flex flex-col items-center justify-center p-8 bg-gray-900' >
            <SectionCard>
                <h1 class='text-2xl font-bold text-green-400 mb-4'>
                    💰 532 NET WORTH PROJECTION
                </h1>
                <h2 class='text-md text-gray-300 mb-4'>
                    Start Building Your Financial Future!!!
                </h2>
                <h3 class='text-sm font-semibold'>
                    Welcome To Your Financial Dashboard
                </h3>
                <div class='p-6 rounded-lg text-center'>
                    <p class='text-gray-400 mb-8 text-sm'>
                        This app will help you visualize and plan your net worth growth
                        using the 50/30/20 budgeting strategy. It's great! The 50/30/20 rule is 1 budgeting guideline that suggests that you should allocate 50% of your after-tax income towards your essential expenses, 30% towards discretionary expenses, and 20% towards savings and debt repayment.
                    </p>
                    <div class="flex flex-col justify-center items-center">
                        <button
                            class='text-lg pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-2 w-full'
                            onClick={() => document.getElementById('income')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                        </button>
                        <span class='py-2 text-gray-400'>OR</span>
                        <button
                            class='text-lg pixel-btn px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg w-full'
                        >
                            Login
                        </button>
                    </div>
                </div>
            </SectionCard>
        </section >
    )
}
