import { formData, addAsset, updateAsset, removeAsset } from '../../shared/formStore';
import { createSignal } from 'solid-js'

export const AssetsSection = () => {
    const [newAsset, setNewAsset] = createSignal({
        type: '',
        name: '',
        value: 0,
        annualReturn: 0,
    });


    // Signal to store all assets
    const [assets, setAssets] = createSignal([]);
    const handleAddAsset = () => {
        if (!newAsset().type || !newAsset().name) {
            alert('Please fill in all required fields');
            return;
        }

        addAsset({
            type: newAsset().type, // Cast to the correct type
            name: newAsset().name,
            value: newAsset().value,
            annualReturn: newAsset().annualReturn,
        });

        setNewAsset({
            type: '' as const,
            name: '',
            value: 0,
            annualReturn: 0,
        });
    };

    return (
        <>
            <h1 class='text-3xl font-bold text-financial-green mb-4'>
                ASSET DETAILS
            </h1>
            <div class="flex-1">
                {/* LIQUID ASSETS */}
                <div class="py-4">
                    <h2 class="text-xl text-financial-green mb-4 font-pixel"><span class="p-4">💸</span>LIQUID ASSETS</h2>
                    <label for="accountType" class="block text-gray-300 mb-2">Account Type</label>
                    <div class="flex">
                        <select
                            value={newAsset().type}
                            onChange={(e) => setNewAsset({ ...newAsset(), type: e.target.value })}
                            class="pixel-border w-full p-2 bg-gray-700 rounded font-pixel mr-20"
                        >
                            <option value="" disabled selected>Select An Asset Type</option>
                            <option value="checking">Checking Account</option>
                            <option value="saving">Saving Account</option>
                            <option value="retirement">Retirement Account</option>
                            <option value="investment">Investment Account</option>
                            <option value="property">Real Estate</option>
                            <option value="other">Other Asset</option>
                        </select>
                    </div>
                </div>
                <div class="py-4">
                    <label for="accountName" class="block text-gray-300 mb-2">Account Name</label>
                    <div class="flex">
                        <input
                            type="string"
                            id="accountName"
                            value={newAsset().name}
                            onChange={(e) => setNewAsset({ ...newAsset(), name: e.target.value })}
                            class="pixel-border w-full p-2 bg-gray-700 rounded pl-8 mr-20"
                            placeholder="US Bank"
                        />
                    </div>
                </div>

                <div class="py-4">
                    <label for="annualReturn" class="block text-gray-300 mb-2">Annual Return</label>
                    <div class="flex">
                        <input
                            type="number"
                            id="annualReturn"
                            value={newAsset().annualReturn}
                            onChange={(e) => setNewAsset({ ...newAsset(), annualReturn: parseFloat(e.target.value) })}
                            class="pixel-border w-full p-2 bg-gray-700 rounded pl-8 mr-20"
                            placeholder="2.00%"
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
                            value={newAsset().value || ''}
                            onChange={(e) => setNewAsset({ ...newAsset(), value: parseFloat(e.target.value) })}
                            class="pixel-border w-full p-2 bg-gray-700 rounded pl-8"
                            placeholder="$1,000"
                        />
                        <button class="pixel-btn bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 ml-2"
                            onClick={handleAddAsset}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}