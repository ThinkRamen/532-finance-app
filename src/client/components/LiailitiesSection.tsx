import { formData, addLiability, removeLiability } from '../../shared/formStore';
import { createSignal } from 'solid-js'
import { SectionCard } from './SectionCard';

export const LiabilitiesSection = () => {

    const [newLiability, setNewLiability] = createSignal({
        type: '',
        name: '',
        value: 0,
        apr: 0,
    });


    // Signal to store all assets
    const [assets, setAssets] = createSignal([]);
    const handleAddLiability = () => {
        if (!newLiability().type || !newLiability().name) {
            alert('Please fill in all required fields');
            return;
        }

        addLiability({
            type: newLiability().type, // Cast to the correct type
            name: newLiability().name,
            value: newLiability().value,
            apr: newLiability().apr,
        });

        setNewLiability({
            type: '' as const,
            name: '',
            value: 0,
            apr: 0,
        });
    };


    return (
        <section class="flex flex-col p-8 bg-gray-900" id="liabilities" >
            <div>
                <div class="flex flex-2 items-center justify-center p-8">
                    <SectionCard class='pixel-border-red'>
                        <h1 class='text-2xl font-bold text-financial-red mb-4'>
                            LIABILITIES DETAILS
                        </h1>
                        <div class="flex-1">
                            {/* LIQUID ASSETS */}
                            <div class="py-4">
                                <h2 class="text-xl text-financial-red mb-4 font-pixel"><span class="p-4 text-xl">💳</span>DEBT OBLIGATIONS</h2>
                                <label for="accountType" class="block text-gray-300 mb-2">Account Type</label>
                                <div class="flex">
                                    <select
                                        class="pixel-border-red w-full p-2 bg-gray-700 rounded font-pixel mr-20"
                                        value={newLiability().type}
                                        onChange={(e) => setNewLiability({ ...newLiability(), type: e.target.value })}
                                    >
                                        <option value="" disabled selected>Select A Liability Type</option>
                                        <option value="credit-card">Credit Card</option>
                                        <option value="laon">Loan</option>
                                        <option value="retirement">Medical Debt</option>
                                        <option value="investment">Studet Debt</option>
                                        <option value="property">Mortgage</option>
                                        <option value="other">Other Liability</option>
                                    </select>
                                </div>
                            </div>
                            <div class="py-4">
                                <label for="accountName" class="block text-gray-300 mb-2">Account Name</label>
                                <div class="flex">
                                    <input
                                        type="string"
                                        id="accountName"
                                        value={newLiability().name || ''}
                                        onChange={(e) => setNewLiability({ ...newLiability(), name: e.target.value })}
                                        class="pixel-border-red w-full p-2 bg-gray-700 rounded pl-8 mr-20"
                                        placeholder="American Express"
                                    />
                                </div>
                            </div>

                            <div class="py-4">
                                <label for="apr" class="block text-gray-300 mb-2">
                                    APR
                                </label>
                                <div class="flex">
                                    <input
                                        type="number"
                                        id="annualReturn"
                                        value={newLiability().apr || ''}
                                        onChange={(e) => setNewLiability({ ...newLiability(), apr: parseFloat(e.target.value) })}
                                        class="pixel-border-red w-full p-2 bg-gray-700 rounded pl-8 mr-20"
                                        placeholder="26.00%"
                                        step="1"
                                        min="0.00"
                                    />
                                </div>
                            </div>

                            <div class="py-4">
                                <label for="accountValue" class="block text-gray-300 mb-2">Value</label>
                                <div class="flex">
                                    <input
                                        type="string"
                                        id="accountValue"
                                        value={newLiability().value || ''}
                                        onChange={(e) => setNewLiability({ ...newLiability(), value: parseFloat(e.target.value) })}
                                        class="pixel-border-red w-full p-2 bg-gray-700 rounded pl-8"
                                        placeholder="$1,000"
                                    />
                                    <button class="pixel-btn-red bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 ml-2"
                                        onClick={handleAddLiability}

                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div >
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
    )
}