import { createStore } from "solid-js/store"

export interface FinancialData {
	hourlyRate: number
	annualSalary: number
	payFrequency: "weekly" | "bi-weekly" | "monthly"
	calculatedPaycheck: number
	investments?: number // 401k, IRA, brokerage accounts, etc.
	liabilities?: number // mortgages, loans, credit card debt, etc.
	expenses: number
	projectionYears: number
	needsPercent: number
	wantsPercent: number
	savingsPercent: number
	investmentReturnRate: number
	debtInterestRate: number
	assets: Asset[]
}

export interface Asset {
	id: string
	type: string
	name: string
	value: number
	annualReturn: number
}

export const [formData, setFormData] = createStore<FinancialData>({
	hourlyRate: 0,
	annualSalary: 0,
	payFrequency: "bi-weekly",
	calculatedPaycheck: 0,
	investments: 0,
	liabilities: 0,
	expenses: 0,
	projectionYears: 10,
	needsPercent: 50,
	wantsPercent: 30,
	savingsPercent: 20,
	investmentReturnRate: 0,
	debtInterestRate: 0,
	assets: [],
})

export const calculateAnnualFromHourly = (
	hourlyRate: number,
	hoursPerWeek: number = 40
): number => {
	return hourlyRate * hoursPerWeek * 52
}

export const calculateHourlyFromAnnual = (
	annualSalary: number,
	hoursPerWeek: number = 40
): number => {
	return annualSalary / (hoursPerWeek * 52)
}

export const calculatePaycheck = (
	annualSalary: number,
	frequency: string
): number => {
	switch (frequency) {
		case "weekly":
			return annualSalary / 52
		case "bi-weekly":
			return annualSalary / 26
		case "monthly":
			return annualSalary / 12
		default:
			return 0
	}
}

// CALCUATE BUDGET BUCKETS BASED ON 50/30/20 RULE
export function calculateBudgetBuckets(calculatedPaycheck: number) {
	const needs = calculatedPaycheck * 0.5 * 0.8
	const wants = calculatedPaycheck * 0.3 * 0.8
	const savings = calculatedPaycheck * 0.2 * 0.8
	return { needs, wants, savings }
}

// HELPER TO UPDATE BOTH FIELDS WHEN ONE CHANGES
export const updateIncomeData = (
	field: "hourlyRate" | "annualSalary",
	value: number
) => {
	if (field === "hourlyRate") {
		const annual = calculateAnnualFromHourly(value)
		setFormData({
			hourlyRate: value,
			annualSalary: annual,
			calculatedPaycheck: calculatePaycheck(annual, formData.payFrequency),
		})
	} else {
		const hourly = calculateHourlyFromAnnual(value)
		setFormData({
			annualSalary: value,
			hourlyRate: hourly,
			calculatedPaycheck: calculatePaycheck(value, formData.payFrequency),
		})
	}
}

export const updatePayFrequency = (frequency: string) => {
	setFormData({
		payFrequency: frequency as FinancialData["payFrequency"],
		calculatedPaycheck: calculatePaycheck(formData.annualSalary, frequency),
	})
}

export const addAsset = (asset: Omit<Asset, "id">) => {
	const newAsset: Asset = {
		id: Math.random().toString(36).substring(2, 9),
		...asset,
	}
	setFormData("assets", [...formData.assets, newAsset])
}

export const updateAsset = (id: string, updates: Partial<Asset>) => {
	setFormData(
		"assets",
		formData.assets.map((asset) =>
			asset.id === id ? { ...asset, ...updates } : asset
		)
	)
}

export const removeAsset = (id: string) => {
	setFormData(
		"assets",
		formData.assets.filter((asset) => asset.id !== id)
	)
}

// CALCULATE NETWORTH SAVINGS, ASSETS, INVESTMENTS +, LIABILITIES -
export function calculateNetWorth(
	assets: number,
	investments: number,
	liabilities: number
) {
	return assets + investments - liabilities
}
