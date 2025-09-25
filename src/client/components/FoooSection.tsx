import { SectionCard } from "./SectionCard"
import { calculateBudgetBuckets } from '../../shared/formStore';

export const FoooSection = () => {
    return (
        <section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="fooo" >
            <div class="flex items-center justify-center p-8 ">
                <SectionCard class='overflow-y-scroll max-h-[90dvh]'>
                    <h1 class="text-2xl font-bold text-green-400 mb-4">
                        FINANCIAL ORDER OF OPERATIONS
                    </h1>
                    {/* Enhanced Priority Flow */}
                    <div class="bg-gray-900/50 p-6 rounded-lg border pixel-border mb-8 ">
                        <div class="flex flex-wrap justify-center items-center gap-4 text-sm">
                            <div class="flex items-center">
                                <div class="bg-financial-green text-white px-4 py-3 rounded pixel-border shadow-lg">
                                    <div class="text-center">
                                        <div class="text-xs opacity-80">STEP 1</div>
                                        <div class="font-bold">SAFETY NET</div>
                                        <div class="text-xs opacity-80">1 MONTH</div>
                                    </div>
                                </div>
                                <div class="mx-3 text-financial-green text-2xl">▶</div>
                            </div>

                            <div class="flex items-center">
                                <div class="bg-financial-red text-white px-4 py-3 rounded pixel-border-red shadow-lg">
                                    <div class="text-center">
                                        <div class="text-xs opacity-80">STEP 2</div>
                                        <div class="font-bold">HIGH DEBT</div>
                                        <div class="text-xs opacity-80">APR &gt; 7%</div>
                                    </div>
                                </div>
                                <div class="mx-3 text-financial-green text-2xl">▶</div>
                            </div>

                            <div class="flex items-center">
                                <div class="bg-financial-blue text-white px-4 py-3 rounded pixel-border-blue shadow-lg">
                                    <div class="text-center">
                                        <div class="text-xs opacity-80">STEP 3</div>
                                        <div class="font-bold">EMERGENCY</div>
                                        <div class="text-xs opacity-80">3-6 MONTHS</div>
                                    </div>
                                </div>
                                <div class="mx-3 text-financial-green text-2xl">▶</div>
                            </div>

                            <div class="bg-financial-green text-white px-4 py-3 rounded pixel-border shadow-lg">
                                <div class="text-center">
                                    <div class="text-xs opacity-80">STEP 4</div>
                                    <div class="font-bold">INVEST</div>
                                    <div class="text-xs opacity-80">LONG TERM</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Explanations Grid */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-financial-green/10 border border-financial-green/30 rounded-lg p-4">
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-financial-green rounded border-2 border-white flex items-center justify-center text-black font-pixel mr-4 flex-shrink-0 shadow-md">1</div>
                                <div>
                                    <strong class="text-financial-green font-pixel">SAFETY NET</strong>
                                    <p class="text-gray-300 text-sm mt-1">One month of essential expenses to avoid missed payments and overdraft fees.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-financial-red/10 border border-financial-red/30 rounded-lg p-4">
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-financial-red rounded border-2 border-white flex items-center justify-center text-white font-pixel mr-4 flex-shrink-0 shadow-md">2</div>
                                <div>
                                    <strong class="text-financial-red font-pixel">HIGH INTEREST DEBT</strong>
                                    <p class="text-gray-300 text-sm mt-1">Pay down debts with APR &gt; 7% before investing for guaranteed returns.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-financial-blue/10 border border-financial-blue/30 rounded-lg p-4">
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-financial-blue rounded border-2 border-white flex items-center justify-center text-white font-pixel mr-4 flex-shrink-0 shadow-md">3</div>
                                <div>
                                    <strong class="text-financial-blue font-pixel">EMERGENCY FUND</strong>
                                    <p class="text-gray-300 text-sm mt-1">Build 3-6 months of essential expenses for job loss or major emergencies.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-financial-green/10 border border-financial-green/30 rounded-lg p-4">
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-financial-green rounded border-2 border-white flex items-center justify-center text-black font-pixel mr-4 flex-shrink-0 shadow-md">4</div>
                                <div>
                                    <strong class="text-financial-green font-pixel">INVESTMENTS</strong>
                                    <p class="text-gray-300 text-sm mt-1">Retirement and brokerage accounts for compound growth and wealth building.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Selection Instructions */}
                    <div class="bg-gray-900/30 border border-gray-600 rounded-lg p-6 mb-6">
                        <div class="flex items-start mb-4">
                            <div class="w-8 h-8 bg-yellow-500 rounded border-2 border-white flex items-center justify-center text-black font-pixel mr-3 flex-shrink-0">!</div>
                            <div>
                                <h3 class="text-yellow-400 font-pixel mb-2">ACCOUNT SETUP INSTRUCTIONS</h3>
                                <p class="text-gray-300 text-sm leading-relaxed">
                                    Select accounts for "Safety Net" & "Emergency Fund" that maintain stable balances.
                                    Avoid accounts with frequent deposits/withdrawals from bill payments.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Financial Calculations Display */}
                    <div class="space-y-4 mb-8">
                        <div class="bg-financial-green/20 border-l-4 border-financial-green rounded p-4">
                            <div class="font-pixel text-financial-green text-sm mb-2">SAFETY NET TARGET</div>
                            <div class="text-white">
                                IF &lt; ${calculateBudgetBuckets().needsMonthly?.toFixed(2) || '0.00'} →
                                Divert ${calculateBudgetBuckets().savingsMonthly?.toFixed(2) || '0.00'}/month
                            </div>
                            <div class="text-gray-400 text-sm mt-1">
                                Timespan: {((calculateBudgetBuckets().needsMonthly || 0) / (calculateBudgetBuckets().savingsMonthly || 1)).toFixed(1)} months
                            </div>
                        </div>

                        <div class="bg-financial-red/20 border-l-4 border-financial-red rounded p-4">
                            <div class="font-pixel text-financial-red text-sm mb-2">HIGH INTEREST DEBT</div>
                            <div class="text-white">IF APR &gt; 7% → Divert ${calculateBudgetBuckets().savingsMonthly?.toFixed(2)}/month to debt payments</div>
                            <div class="text-gray-400 text-sm mt-1">Paying off high-interest debt like credit cards at 24-26% APR provides guaranteed "returns" that even Warren Buffett's legendary 20% average returns can't beat! The S&P 500 averages only 10-12% annually, making debt payoff twice as profitable as investing.</div>
                        </div>

                        <div class="bg-financial-blue/20 border-l-4 border-financial-blue rounded p-4">
                            <div class="font-pixel text-financial-blue text-sm mb-2">EMERGENCY FUND TARGETS</div>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-white">3-Month Fund:</span>
                                    <span class="text-financial-blue font-pixel">
                                        ${((calculateBudgetBuckets().needsMonthly || 0) * 3).toFixed(0)}
                                    </span>
                                </div>
                                <div class="text-gray-400 text-sm">
                                    Timespan: {(((calculateBudgetBuckets().needsMonthly || 0) * 3) / (calculateBudgetBuckets().savingsMonthly || 1)).toFixed(1)} months
                                </div>

                                <div class="flex justify-between items-center mt-3">
                                    <span class="text-white">6-Month Fund:</span>
                                    <span class="text-financial-blue font-pixel">
                                        ${((calculateBudgetBuckets().needsMonthly || 0) * 6).toFixed(0)}
                                    </span>
                                </div>
                                <div class="text-gray-400 text-sm">
                                    Timespan: {(((calculateBudgetBuckets().needsMonthly || 0) * 6) / (calculateBudgetBuckets().savingsMonthly || 1)).toFixed(1)} months
                                </div>
                            </div>
                        </div>

                        <div class="bg-financial-green/20 border-l-4 border-financial-green rounded p-4">
                            <div class="font-pixel text-financial-green text-sm mb-2">INVESTMENT READY</div>
                            <div class="text-white">
                                After 3-6 month emergency fund is complete, maximize investment contributions for compound growth.
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button class="pixel-btn px-8 py-4 bg-financial-green hover:bg-financial-green/80 text-black font-pixel rounded-lg border-2 border-white shadow-lg transition-all duration-200 hover:scale-105">
                            CONTINUE TO NEXT STEP
                        </button>
                    </div>
                </SectionCard>
            </div>
        </section>

    )
}