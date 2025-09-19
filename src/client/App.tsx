import { IncomeSection } from '../client/components/IncomeSection'
import { AssetsSection } from '../client/components/AssetsSection'
import { formData, calculateBudgetBuckets, removeAsset, removeLiability } from '../shared/formStore'
import { LiabilitiesSection } from './components/LiailitiesSection';

export default function App() {
	const budgetBuckets = () => calculateBudgetBuckets(formData.calculatedPaycheck);

	const SectionCard = (props: { children: any; class?: string }) => {
		return (
			<div class={`pixel-border p-6 text-center rounded-lg bg-gray-800 w-full mx-4 ${props.class || ''}`}>
				{props.children}
			</div>
		)
	}
	return (
		<>
			{/* WELCOME SECTION */}
			<section class='min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900'>
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
			</section>

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
					<SectionCard class="max-w-2xl">
						<div class="financial-card">
							<h1 class="text-3xl font-pixel text-financial-green mb-6 text-center">
								FINANCIAL ORDER OF OPERATIONS
							</h1>

							{/* Priority Flow */}
							<div class="flex justify-center items-center mb-8 font-pixel">
								<div class="bg-financial-green text-white px-4 py-2 rounded">Safety Net</div>
								<div class="mx-2 text-financial-green text-xl">→</div>
								<div class="bg-financial-red text-white px-4 py-2 rounded">High Interest Debt</div>
								<div class="mx-2 text-financial-green text-xl">→</div>
								<div class="bg-financial-blue text-white px-4 py-2 rounded">Emergency Fund</div>
								<div class="mx-2 text-financial-green text-xl">→</div>
								<div class="bg-financial-green text-white px-4 py-2 rounded">Investments</div>
							</div>

							{/* Explanations */}
							<div class="space-y-4 text-sm">
								<div class="flex items-start">
									<div class="w-8 h-8 bg-financial-green rounded-full flex items-center justify-center text-white font-pixel mr-3 flex-shrink-0">1</div>
									<div>
										<strong class="text-financial-green">Safety Net:</strong>
										<span class="text-gray-300"> One month of essential expenses to avoid missed payments.</span>
									</div>
								</div>

								<div class="flex items-start">
									<div class="w-8 h-8 bg-financial-red rounded-full flex items-center justify-center text-white font-pixel mr-3 flex-shrink-0">2</div>
									<div>
										<strong class="text-financial-red">High Interest Debt:</strong>
										<span class="text-gray-300"> Pay down debts with APR &gt; 7% before investing.</span>
									</div>
								</div>

								<div class="flex items-start">
									<div class="w-8 h-8 bg-financial-blue rounded-full flex items-center justify-center text-white font-pixel mr-3 flex-shrink-0">3</div>
									<div>
										<strong class="text-financial-blue">Emergency Fund:</strong>
										<span class="text-gray-300"> Build 3-6 months of essential expenses.</span>
									</div>
								</div>

								<div class="flex items-start">
									<div class="w-8 h-8 bg-financial-green rounded-full flex items-center justify-center text-white font-pixel mr-3 flex-shrink-0">4</div>
									<div>
										<strong class="text-financial-green">Investments:</strong>
										<span class="text-gray-300"> Retirement and brokerage accounts for long-term growth.</span>
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center">
							<button
								class="pixel-btn px-6 py-3 my-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
								onClick={() => document.getElementById('')?.scrollIntoView({ behavior: 'smooth' })}
							>
								Next
							</button>
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
