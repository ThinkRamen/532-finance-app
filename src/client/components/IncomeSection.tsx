import { formData, updateIncomeData, updatePayFrequency, calculateBudgetBuckets } from '../../shared/formStore';
import { createMemo } from 'solid-js';
import { SectionCard } from "./SectionCard";

export const IncomeSection = () => {
    const paycheckDisplay = createMemo(() => formData.calculatedPaycheck);

    const handleHourlyRateChange = (value: number) => {
        updateIncomeData('hourlyRate', value)
    }

    const handleAnnualSalaryChange = (value: number) => {
        updateIncomeData('annualSalary', value)
    }

    const handleFrequencyChange = (value: string) => {
        updatePayFrequency(value);
    };

    return (
        <>
            <section class="flex p-8 bg-gray-900" id="income">
                <div class="flex items-center justify-center">
                    <SectionCard>
                        <h1 class='font-bold text-green-400 mb-4'>
                            INCOME DETAILS
                        </h1>
                        {/* HOURLY RATE INPUT */}
                        <div>
                            <label for="hourlyRate" class="text-xs text-gray-300 mb-2">Hourly Rate</label>
                            <input
                                type="number"
                                id="hourlyRate"
                                value={formData.hourlyRate || ''}
                                onChange={(e) => handleHourlyRateChange(parseFloat(e.target.value) || 7.50)}
                                class="pixel-border w-full p-2 bg-gray-700 rounded pl-8"
                                placeholder="$7.50"
                                step="1"
                                min="0"
                            />
                        </div>
                        <div class="items-center justify-center flex">
                            <span class='text-xs text-gray-300 mb-2'>OR</span>
                        </div>
                        {/* ANNUAL SALARY INPUT */}
                        <div>
                            <label for="annualSalary" class="text-xs text-gray-300 mb-2">Annual Salary</label>
                            <input
                                type="number"
                                id="annualSalary"
                                value={formData.annualSalary || ''}
                                onChange={(e) => handleAnnualSalaryChange(parseFloat(e.target.value) || 15600)}
                                class="pixel-border w-full p-2 bg-gray-700 rounded pl-8"
                                placeholder="$15,600"
                                step="1000"
                                min="0"
                            />
                        </div>
                        {/* Pay Frequency Select */}
                        <div class="py-4">
                            <label for="payFrequency" class="text-xs text-gray-300 mb-2">Pay Frequency</label>
                            <select
                                id="payFrequency"
                                value={formData.payFrequency}
                                onChange={(e) => handleFrequencyChange(e.target.value)}
                                class="pixel-border w-full p-2 bg-gray-700 rounded pl-8"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        {/* Paycheck Display */}
                        <div class="py-4" >
                            <h3 class="text-md text-gray-300 mb-2">Estimated Paycheck</h3>
                            <div class="pixel-border bg-gray-700 py-2 rounded text-center">
                                <span class="text-2xl  text-financial-green">
                                    ${paycheckDisplay().toFixed(2)}
                                </span>
                                <p class="text-xs text-gray-400 mt-1">
                                    per {formData.payFrequency.replace('-', ' ').toLowerCase()}
                                </p>
                            </div>

                        </div>
                        <button
                            class="pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full"
                            onClick={() => document.getElementById('assets')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Next: Assets
                        </button>
                    </SectionCard>
                </div>
            </section>
            <section class="flex p-8 bg-gray-900" id='budget'>
                <div class="flex flex-1 flex-col gap-4 items-center justify-center">
                    <h2 class="text-lg">BUDGET (w/ 20% tax)</h2>
                    <div class="flex flex-col gap-4">
                        <SectionCard>
                            {/* NEEDS BUDGET CONTENT */}
                            <h2 class="text-md text-financial-red">NEEDS (50%)</h2>
                            <p class="text-xs"> per paycheck ${calculateBudgetBuckets().needs.toFixed(2)} </p>
                            <p class="text-xs"> per month ${(formData.annualSalary / 12 * .5 * .8).toFixed(2)} </p>
                            <p class="text-xs"> per year ${(formData.annualSalary * .5 * .8).toFixed(2)} </p>
                        </SectionCard>
                        <SectionCard>
                            {/* WANTS BUDGET CONTENT */}
                            <h2 class="text-md text-financial-blue">WANTS (30%)</h2>
                            <p class="text-xs"> per paycheck ${calculateBudgetBuckets().wants.toFixed(2)} </p>
                            <p class="text-xs"> per month ${(formData.annualSalary / 12 * .3 * .8).toFixed(2)} </p>
                            <p class="text-xs"> per year ${(formData.annualSalary * .3 * .8).toFixed(2)} </p>
                        </SectionCard>
                        <SectionCard>
                            {/* SAVINGS BUDGET CONTENT */}
                            <h2 class="text-md text-financial-green">SAVINGS (20%)</h2>
                            <p class="text-xs"> per paycheck ${calculateBudgetBuckets().savings.toFixed(2)} </p>
                            <p class="text-xs"> per month ${(formData.annualSalary / 12 * .2 * .8).toFixed(2)} </p>
                            <p class="text-xs"> per year ${(formData.annualSalary * .2 * .8).toFixed(2)} </p>
                        </SectionCard>
                    </div>
                </div>
            </section>
        </>

    )
}