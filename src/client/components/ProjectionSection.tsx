import { SectionCard } from "./SectionCard"
import { createMemo } from "solid-js"
import { calculateBudgetBuckets, formData } from '../../shared/formStore';

const projectionData = createMemo(() => {
})

const GenerateProjecionTable = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Asset 1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>${calculateBudgetBuckets().needs.toFixed(2)}</th>
                </tr>
            </tbody>
        </table>

    )
}

export const ProjectionSection = () => {
    return (
        <section class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900" id="projection" >
            <SectionCard>
                <h1 class='text-3xl font-bold text-green-400 mb-4'>
                    📈 NET WORTH PROJECTION
                </h1>
                <h2 class='text-gray-300 mb-6'>
                    See How Your Net Worth Can Grow Over Time
                </h2>
                <div>
                    <label for="projectionYears" class="text-gray-300 mb-2">Projection Years:</label>
                    <input type="number" id="projectionYears" value={1} min={1} max={50} class="ml-2 p-1 rounded bg-gray-800 text-white border border-gray-600" />
                </div>
                <div class="mt-4 p-4 bg-gray-800 rounded">
                    <h3 class="text-lg font-semibold text-green-400 mb-2">Projected Net Worth Over Time</h3>
                    <div class="h-64 bg-gray-700 flex items-center justify-center text-gray-400">
                        <GenerateProjecionTable />
                    </div>
                </div>
            </SectionCard>
        </section>
    )
}
