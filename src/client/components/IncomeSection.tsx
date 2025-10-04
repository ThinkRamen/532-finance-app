import { formData, updateIncomeData, updatePayFrequency, calculateBudgetBuckets } from '../../shared/formStore';
import { createMemo } from 'solid-js';
import { SectionCard } from './SectionCard';

export const IncomeSection = () => {
	const paycheckDisplay = createMemo(() => formData.calculatedPaycheck);

	const handleHourlyRateChange = (value: number) => {
		updateIncomeData('hourlyRate', value);
	};

	const handleAnnualSalaryChange = (value: number) => {
		updateIncomeData('annualSalary', value);
	};

	const handleFrequencyChange = (value: string) => {
		updatePayFrequency(value);
	};

	return (
		<>
			<section class='flex p-8 bg-gray-900' id='income'>
				<div class='flex flex-1 items-center justify-center'>
					<SectionCard>
						<h1 class='font-bold text-green-400 mb-4'>INCOME DETAILS</h1>
						<div class='p-4'>
							{/* HOURLY RATE INPUT */}
							<div class='mb-4'>
								<label for='hourlyRate' class='text-gray-300'>
									Hourly Rate
								</label>
								<input
									type='number'
									id='hourlyRate'
									value={formData.hourlyRate || ''}
									onChange={(e) => handleHourlyRateChange(parseFloat(e.target.value) || 7.5)}
									class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
									placeholder='$7.50'
									step='1'
									min='0'
								/>
							</div>
							<div class='items-center justify-center flex'>
								<span class='text-gray-300 py-2'>OR</span>
							</div>
							{/* ANNUAL SALARY INPUT */}
							<div class='mb-4'>
								<label for='annualSalary' class='text-gray-300'>
									Annual Salary
								</label>
								<input
									type='number'
									id='annualSalary'
									value={formData.annualSalary || ''}
									onChange={(e) => handleAnnualSalaryChange(parseFloat(e.target.value) || 15600)}
									class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
									placeholder='$15,600'
									step='1000'
									min='0'
								/>
							</div>
							{/* Pay Frequency Select */}
							<div class='mb-4'>
								<label for='payFrequency' class='text-gray-300'>
									Pay Frequency
								</label>
								<select
									id='payFrequency'
									value={formData.payFrequency}
									onChange={(e) => handleFrequencyChange(e.target.value)}
									class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
								>
									<option value='weekly'>Weekly</option>
									<option value='bi-weekly'>Bi-Weekly</option>
									<option value='monthly'>Monthly</option>
								</select>
							</div>
							{/* Paycheck Display */}
							<div class='mb-6'>
								<h3 class='text-gray-300'>Estimated Paycheck</h3>
								<div class='pixel-border bg-gray-700 py-2 rounded text-center'>
									<span class='text-2xl text-financial-green'>${paycheckDisplay().toFixed(2)}</span>
									<p class='text-xs text-gray-400 mt-1'>
										per {formData.payFrequency.replace('-', ' ').toLowerCase()}
									</p>
								</div>
							</div>
							<button
								class='pixel-btn py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full'
								onClick={() =>
									document.getElementById('budget')?.scrollIntoView({ behavior: 'smooth' })
								}
							>
								Get Budget
							</button>
						</div>
					</SectionCard>
				</div>
			</section>
			<section class='flex p-8 bg-gray-900' id='budget'>
				<div class='flex flex-1 flex-col items-center justify-center text-center'>
					<h1 class='mb-8'>BUDGET (incl. 20% tax)</h1>
					<div class='flex flex-col gap-8 w-full items-center justify-center'>
						<SectionCard class='p-8 mr-3 justify-center items-center w-full'>
							{/* NEEDS BUDGET CONTENT */}
							<h2 class='text-financial-red mb-4'>NEEDS (50%)</h2>
							<div class='flex justify-between'>
								<h3 class='text-left'>per paycheck</h3>
								<h3 class='text-right'>${calculateBudgetBuckets().needs.toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per month</h3>
								<h3>${((formData.annualSalary / 12) * 0.5 * 0.8).toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per year</h3>
								<h3>${(formData.annualSalary * 0.5 * 0.8).toFixed(2)}</h3>
							</div>
						</SectionCard>
						<SectionCard class='p-8 mr-3 justify-center items-center w-full'>
							{/* WANTS BUDGET CONTENT */}
							<h2 class='text-financial-blue mb-4'>WANTS (30%)</h2>
							<div class='flex justify-between'>
								<h3 class='text-left'>per paycheck</h3>
								<h3 class='text-right'>${calculateBudgetBuckets().wants.toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per month</h3>
								<h3>${((formData.annualSalary / 12) * 0.3 * 0.8).toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per year</h3>
								<h3>${(formData.annualSalary * 0.3 * 0.8).toFixed(2)}</h3>
							</div>
						</SectionCard>
						<SectionCard class='p-8 mr-3 justify-center items-center w-full'>
							{/* SAVINGS BUDGET CONTENT */}
							<h2 class='text-financial-green mb-4'>SAVINGS (20%)</h2>
							<div class='flex justify-between'>
								<h3 class='text-left'>per paycheck</h3>
								<h3 class='text-right'>${calculateBudgetBuckets().savings.toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per month</h3>
								<h3>${((formData.annualSalary / 12) * 0.2 * 0.8).toFixed(2)}</h3>
							</div>
							<div class='flex justify-between'>
								<h3 class='text-left'>per year</h3>
								<h3>${(formData.annualSalary * 0.2 * 0.8).toFixed(2)}</h3>
							</div>
						</SectionCard>
						<div class='flex justify-center w-full'>
							<button
								class='pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full'
								onClick={() =>
									document.getElementById('assets')?.scrollIntoView({ behavior: 'smooth' })
								}
							>
								Next: Assets
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
