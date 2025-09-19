import { e } from 'unocss/index';
import { formData, addAsset, updateAsset, removeAsset, addLiability } from '../../shared/formStore';
import { createSignal } from 'solid-js'

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
        <>
            <h1 class='text-3xl font-bold text-financial-red mb-4'>
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
        </>
    )
}