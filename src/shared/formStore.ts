import { createStore } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

export interface FinancialData {
	hourlyRate: number;
	annualSalary: number;
	payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
	calculatedPaycheck: number;
	expenses: number;
	projectionYears: number;
	needsPercent: number;
	wantsPercent: number;
	savingsPercent: number;
	assets: Asset[];
	liabilities: Liability[];
}

export interface Asset {
	id: string;
	type: string;
	name: string;
	value: number;
	annualReturn: number;
}

export interface Liability {
	id: string;
	type: string;
	name: string;
	value: number;
	apr: number;
}

export const [formData, setFormData] = makePersisted(
	createStore<FinancialData>({
		hourlyRate: 0,
		annualSalary: 0,
		payFrequency: 'bi-weekly',
		calculatedPaycheck: 0,
		expenses: 0,
		projectionYears: 10,
		needsPercent: 50,
		wantsPercent: 30,
		savingsPercent: 20,
		assets: [],
		liabilities: []
	}),
	{ name: 'userData', storage: localStorage }
);

export const calculateAnnualFromHourly = (hourlyRate: number, hoursPerWeek: number = 40): number => {
	return hourlyRate * hoursPerWeek * 52;
};

export const calculateHourlyFromAnnual = (annualSalary: number, hoursPerWeek: number = 40): number => {
	return annualSalary / (hoursPerWeek * 52);
};

export const calculatePaycheck = (annualSalary: number, frequency: string): number => {
	switch (frequency) {
		case 'weekly':
			return annualSalary / 52;
		case 'bi-weekly':
			return annualSalary / 26;
		case 'monthly':
			return annualSalary / 12;
		default:
			return 0;
	}
};

// CALCULATE BUDGET BUCKETS BASED ON 50/30/20 RULE
export function calculateBudgetBuckets() {
	const needs = formData.calculatedPaycheck * 0.5 * 0.8;
	const wants = formData.calculatedPaycheck * 0.3 * 0.8;
	const savings = formData.calculatedPaycheck * 0.2 * 0.8;

	const monthly = formData.annualSalary / 12;
	const afterTax = monthly * 0.8;
	const needsMonthly = afterTax * 0.5;
	const wantsMonthly = afterTax * 0.3;
	const savingsMonthly = afterTax * 0.2;
	return { needs, wants, savings, needsMonthly, wantsMonthly, savingsMonthly };
}

// HELPER TO UPDATE BOTH FIELDS WHEN ONE CHANGES
export const updateIncomeData = (field: 'hourlyRate' | 'annualSalary', value: number) => {
	if (field === 'hourlyRate') {
		const annual = calculateAnnualFromHourly(value);
		setFormData({
			hourlyRate: value,
			annualSalary: annual,
			calculatedPaycheck: calculatePaycheck(annual, formData.payFrequency)
		});
	} else {
		const hourly = calculateHourlyFromAnnual(value);
		setFormData({
			annualSalary: value,
			hourlyRate: hourly,
			calculatedPaycheck: calculatePaycheck(value, formData.payFrequency)
		});
	}
};

export const updatePayFrequency = (frequency: string) => {
	setFormData({
		payFrequency: frequency as FinancialData['payFrequency'],
		calculatedPaycheck: calculatePaycheck(formData.annualSalary, frequency)
	});
};

export const addAsset = (asset: Omit<Asset, 'id'>) => {
	const newAsset: Asset = {
		id: Math.random().toString(36).substring(2, 9),
		...asset
	};
	setFormData('assets', [...formData.assets, newAsset]);
};

export const addLiability = (liability: Omit<Liability, 'id'>) => {
	const newLiability: Liability = {
		id: Math.random().toString(36).substring(2, 9),
		...liability
	};
	setFormData('liabilities', [...formData.liabilities, newLiability]);
};

export const updateAsset = (id: string, updates: Partial<Asset>) => {
	setFormData(
		'assets',
		formData.assets.map((asset) => (asset.id === id ? { ...asset, ...updates } : asset))
	);
};

export const updateLiability = (id: string, updates: Partial<Liability>) => {
	setFormData(
		'liabilities',
		formData.liabilities.map((liability) => (liability.id === id ? { ...liability, ...updates } : liability))
	);
};

export const removeAsset = (id: string) => {
	setFormData(
		'assets',
		formData.assets.filter((asset) => asset.id !== id)
	);
};

export const removeLiability = (id: string) => {
	setFormData(
		'liabilities',
		formData.liabilities.filter((liability) => liability.id !== id)
	);
};

// CALCULATE NETWORTH SAVINGS, ASSETS, INVESTMENTS +, LIABILITIES -
export function calculateNetWorth(assets: number, liabilities: number) {
	return assets - liabilities;
}
