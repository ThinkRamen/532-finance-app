import { IncomeSection } from '../client/components/IncomeSection'
import { AssetsSection } from '../client/components/AssetsSection'
import { SectionCard } from './components/SectionCard';
import { formData, calculateBudgetBuckets, removeAsset, removeLiability } from '../shared/formStore'
import { LiabilitiesSection } from './components/LiailitiesSection';
import { WelcomeSection } from './components/WelcomeSection';

export default function App() {
	const budgetBuckets = () => calculateBudgetBuckets();

	return (
		<>
			{/* WELCOME SECTION */}
			<WelcomeSection />

			{/* <!-- INCOME INPUT SECTION --> */}
			<section class="min-h-screen flex flex-col p-8 bg-gray-900" id="income">
				<div class="flex flex-2 items-center justify-center p-8">
					<SectionCard class="max-w-2xl">
						<IncomeSection />
					</SectionCard>
				</div>
				<div class="flex flex-col flex-1 p-8 items-center justify-center h-full">
					<div class='flex mb-8'>
						<h1 class="text-3xl">BUDGET (w/ 20% tax)</h1>
					</div>

					<div class="flex w-full justify-around">
						<SectionCard>
							{/* Needs Budget Content */}
							<h2 class="text-xl text-financial-red mb-4">NEEDS (50%)</h2>
							<p class="py-2 text-md"> per paycheck ${budgetBuckets().needs.toFixed(2)} </p>
							<p class="py-2 text-md"> per month ${(formData.annualSalary / 12 * .5 * .8).toFixed(2)} </p>
							<p class="py-2 text-md"> per year ${(formData.annualSalary * .5 * .8).toFixed(2)} </p>

						</SectionCard>

						<SectionCard>
							{/* Wants Budget Content */}
							<h2 class="text-xl text-financial-blue mb-4">WANTS (30%)</h2>
							<p class="py-2 text-md"> per paycheck ${budgetBuckets().wants.toFixed(2)} </p>
							<p class="py-2 text-md"> per month ${(formData.annualSalary / 12 * .3 * .8).toFixed(2)} </p>
							<p class="py-2 text-md"> per year ${(formData.annualSalary * .3 * .8).toFixed(2)} </p>

						</SectionCard>

						<SectionCard>
							{/* Savings Budget Content */}
							<h2 class="text-xl text-financial-green mb-4">SAVINGS (20%)</h2>
							<p class="py-2 text-md"> per paycheck ${budgetBuckets().savings.toFixed(2)} </p>
							<p class="py-2 text-md"> per month ${(formData.annualSalary / 12 * .2 * .8).toFixed(2)} </p>
							<p class="py-2 text-md"> per year ${(formData.annualSalary * .2 * .8).toFixed(2)} </p>

						</SectionCard>
					</div>
				</div>
			</section >

			{/* <!-- ASSETS INPUT SECTION --> */}
			<section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="assets" >
				<div>
					<div class="flex flex-2 items-center justify-center p-8">
						<SectionCard class="max-w-2xl">
							<AssetsSection></AssetsSection>
						</SectionCard>
					</div>
					<div class="flex flex-1 p-8 items-center justify-center h-full">
						<SectionCard>
							<h2 class="text-xl text-financial-green mb-4 font-pixel">YOUR ASSETS</h2>

							{/* Display Added Assets */}
							<div class="py-4">
								{formData.assets.length === 0 ? (
									<p class="text-gray-400 font-pixel text-center py-8">No assets added yet</p>
								) : (
									<div class="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Use grid for better layout */}
										{formData.assets.map((asset) => (
											<div class="pixel-border p-4 bg-gray-700 rounded flex flex-col justify-between min-h-[120px]">
												{/* Asset Info */}
												<div class="flex-1">
													<div class="flex justify-between items-start mb-2">
														<div class="flex-1">
															<div class="font-pixel text-financial-green text-sm truncate" title={asset.name}>
																{asset.name}
															</div>
															<div class="text-xs text-gray-400 font-pixel uppercase">
																{asset.type}
															</div>
														</div>

														{/* Remove Button */}
														<button
															class="pixel-btn-red bg-financial-red hover:bg-red-700 text-white rounded w-6 h-6 flex items-center justify-center ml-2 flex-shrink-0"
															onClick={() => removeAsset(asset.id)}
															title="Remove asset"
														>
															×
														</button>
													</div>
												</div>

												{/* Asset Details */}
												<div class="flex justify-between items-end pt-2 border-t border-gray-600">
													<div class="text-xs font-pixel text-financial-blue">
														{asset.annualReturn}% RETURN
													</div>
													<div class="font-pixel text-financial-green text-sm">
														${asset.value.toFixed(2).toLocaleString()}
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Total Assets Summary */}
							{formData.assets.length > 0 && (
								<div class="pixel-border p-4 bg-gray-800 rounded mt-4">
									<div class="flex justify-between items-center font-pixel">
										<span class="text-financial-green">TOTAL ASSETS:</span>
										<span class="text-xl text-financial-green">
											${formData.assets.reduce((total, asset) => total + asset.value, 0).toFixed(2).toLocaleString()}
										</span>
									</div>
									<div class="text-xs text-gray-400 font-pixel mt-2 text-center">
										{formData.assets.length} asset{formData.assets.length !== 1 ? 's' : ''} •
										Avg. Return: {(
											formData.assets.reduce((total, asset) => total + asset.annualReturn, 0) /
											formData.assets.length
										).toFixed(2)}%
									</div>
								</div>
							)}
						</SectionCard>
					</div>
					<div class="flex justify-center">
						<button
							class="pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
							onClick={() => document.getElementById('liabilities')?.scrollIntoView({ behavior: 'smooth' })}
						>
							Next: Liabilities
						</button>
					</div>

				</div>

			</section >

			{/* LIABILITIES SECTION */}
			<section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="liabilities" >
				<div>
					<div class="flex flex-2 items-center justify-center p-8">
						<SectionCard class='max-w-2xl pixel-border-red'>
							<LiabilitiesSection></LiabilitiesSection>
						</SectionCard>
					</div>
					<div class="flex flex-1 p-8 items-center justify-center h-full">
						<SectionCard class="pixel-border-red">
							<h2 class="text-xl text-financial-red mb-4">YOUR LIABILITIES</h2>
							{/* Display Added Liabilities */}
							<div class="py-4">
								{formData.liabilities.length === 0 ? (
									<p class="text-gray-400 text-center py-8">No liabilities added yet</p>
								) : (
									<div class="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Use grid for better layout */}
										{formData.liabilities.map((liability) => (
											<div class="pixel-border-red p-4 bg-gray-700 rounded flex flex-col justify-between min-h-[120px]">
												{/* liability Info */}
												<div class="flex-1">
													<div class="flex justify-between items-start mb-2">
														<div class="flex-1">
															<div class="text-financial-red text-sm truncate" title={liability.name}>
																{liability.name}
															</div>
															<div class="text-xs text-gray-400 uppercase">
																{liability.type}
															</div>
														</div>

														{/* Remove Button */}
														<button
															class="pixel-btn-red bg-financial-red hover:bg-red-700 text-white rounded w-6 h-6 flex items-center justify-center ml-2 flex-shrink-0"
															onClick={() => removeLiability(liability.id)}
															title="Remove asset"
														>
															×
														</button>
													</div>
												</div>

												{/* Asset Details */}
												<div class="flex justify-between items-end pt-2 border-t border-gray-600">
													<div class="text-xs font-pixel text-financial-red">
														{liability.apr}% APR
													</div>
													<div class="text-sm">
														${liability.value.toFixed(2).toLocaleString()}
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Total liabilities Summary */}
							{formData.liabilities.length > 0 && (
								<div class="pixel-border-red p-4 bg-gray-800 rounded mt-4">
									<div class="flex justify-between items-center font-pixel">
										<span class="text-financial-red">TOTAL LIABILITIES:</span>
										<span class="text-xl">
											${formData.liabilities.reduce((total, liability) => total + liability.value, 0).toFixed(2).toLocaleString()}
										</span>
									</div>
									<div class="text-xs text-gray-400 font-pixel mt-2 text-center">
										{formData.liabilities.length} asset{formData.liabilities.length !== 1 ? 's' : ''} •
										Avg. Return: {(
											formData.liabilities.reduce((total, liability) => total + liability.apr, 0) /
											formData.liabilities.length
										).toFixed(2)}%
									</div>
								</div>
							)}
						</SectionCard>
					</div>
					<div class="flex justify-center">
						<button
							class="pixel-btn-red px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
							onClick={() => document.getElementById('fooo')?.scrollIntoView({ behavior: 'smooth' })}
						>
							Next: Financial Order of Operations
						</button>
					</div>
				</div>
			</section>

			{/* IF LOGGED IN, SKIP TO HERE */}
			{/* SNAPSHOT */}

			{/* FINANCIAL ORDER OF OPERATIONS SECTION*/}
			<section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="fooo" >
				<div class="flex flex-2 items-center justify-center p-8">
					<SectionCard>
						<div>
							<h1 class="text-3xl text-financial-green mb-8 text-center tracking-wide">
								FINANCIAL ORDER OF OPERATIONS
							</h1>
							{/* Enhanced Priority Flow */}
							<div class="bg-gray-900/50 p-6 rounded-lg border pixel-border mb-8">
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
						</div>
					</SectionCard>
				</div>
			</section>
			{/* PROJECTION SECTION*/}
			{/* SPREADSHEET */}
			{/* GRAPH */}

			{/* COMPARISON: INITIAL PROJECTION VS CURRENT PERFORMANCE */}
			{/*  AI ANALYSIS */}
			{/* AFFIRMATION OR SCOLDING */}
		</>
	)
}
