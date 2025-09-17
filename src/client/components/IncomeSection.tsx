import { formData, updateIncomeData, updatePayFrequency } from '../../shared/formStore';
import { createMemo } from 'solid-js';

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
            <h1 class='text-3xl font-bold text-green-400 mb-4'>
                INCOME DETAILS
            </h1>

            {/* Hourly Rate Input */}
            <div class="py-4">
                <label for="hourlyRate" class="block text-gray-300 mb-2">Hourly Rate</label>
                <div class="relative">
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
            </div>

            <span class='py-2 text-gray-400  text-center block'>OR</span>

            {/* Annual Salary Input */}
            <div class="py-4">
                <label for="annualSalary" class="block text-gray-300 mb-2">Annual Salary</label>
                <div class="relative">
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
            </div>

            {/* Pay Frequency Select */}
            <div class="py-4">
                <label for="payFrequency" class="block text-gray-300 mb-2">Pay Frequency</label>
                <select
                    id="payFrequency"
                    value={formData.payFrequency}
                    onChange={(e) => handleFrequencyChange(e.target.value)}
                    class="pixel-border w-full p-2 bg-gray-700 rounded"
                >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            {/* Paycheck Display */}
            <div class="py-4" >
                <h3 class="block text-gray-300 mb-2">Estimated Paycheck</h3>
                <div class="pixel-border bg-gray-700 py-4 rounded text-center">
                    <span class="text-2xl  text-financial-green">
                        ${paycheckDisplay().toFixed(2)}
                    </span>
                    <p class="text-sm text-gray-400 mt-1">
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
        </>
    )
}