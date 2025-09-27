import { formData, addAsset, removeAsset } from '../../shared/formStore';
import { createSignal } from 'solid-js';
import { SectionCard } from './SectionCard';

export const AssetsSection = () => {
	const [newAsset, setNewAsset] = createSignal({
		type: '',
		name: '',
		value: 0,
		annualReturn: 0
	});

	// SIGNAL TO STORE ALL ASSETS
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
			annualReturn: newAsset().annualReturn
		});

		setNewAsset({
			type: '' as const,
			name: '',
			value: 0,
			annualReturn: 0
		});
	};

	return (
		<section class='flex flex-col p-8 m-2 bg-gray-900' id='assets'>
			<div class='flex flex-1 items-center justify-center p-8'>
				<SectionCard>
					<h1 class='font-bold text-green-400 mb-4'>ASSET DETAILS</h1>
					<h2 class='mb-4'>LIQUID ASSETS</h2>
					<div class='mb-4'>
						<label for='accountName' class='text-gray-300'>
							Account Name
						</label>
						<input
							type='string'
							id='accountName'
							value={newAsset().name}
							onChange={(e) => setNewAsset({ ...newAsset(), name: e.target.value })}
							class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
							placeholder='US Bank'
						/>
					</div>
					<div class='mb-4'>
						<label for='accountValue' class='text-gray-300 mb-2'>
							Account Value
						</label>
						<input
							type='string'
							id='accountValue'
							value={newAsset().value || ''}
							onChange={(e) => setNewAsset({ ...newAsset(), value: parseFloat(e.target.value) })}
							class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
							placeholder='$1,000'
						/>
					</div>
					<div class='mb-4'>
						<label for='accountType' class='text-gray-300 mb-2'>
							Account Type
						</label>
						<select
							value={newAsset().type}
							onChange={(e) => setNewAsset({ ...newAsset(), type: e.target.value })}
							class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
						>
							<option value='' disabled selected>
								Select An Asset Type
							</option>
							<option value='checking'>Checking Account</option>
							<option value='saving'>Saving Account</option>
							<option value='retirement'>Retirement Account</option>
							<option value='investment'>Investment Account</option>
							<option value='property'>Real Estate</option>
							<option value='other'>Other Asset</option>
						</select>
					</div>
					<div class='flex flex-col'>
						<label for='annualReturn' class='text-gray-300 mb-2'>
							Annual Return
						</label>
						<div class='flex'>
							<input
								type='number'
								id='annualReturn'
								value={newAsset().annualReturn}
								onChange={(e) =>
									setNewAsset({ ...newAsset(), annualReturn: parseFloat(e.target.value) })
								}
								class='pixel-border w-full p-2 bg-gray-700 rounded pl-8'
								placeholder='2.00%'
								step='1'
								min='0.00'
							/>
							<button
								class='pixel-btn bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 ml-2'
								onClick={handleAddAsset}
							>
								+
							</button>
						</div>
					</div>
				</SectionCard>
			</div>
			<div class='flex flex-1 flex-col items-center justify-center p-8 space-y-8'>
				<SectionCard>
					<h2 class='text-lg font-bold text-green-400 mb-4'>YOUR ASSETS</h2>

					{/* Display Added Assets */}
					<div>
						{formData.assets.length === 0 ? (
							<p class='text-sm text-gray-400 font-pixel text-center py-8'>No assets added yet</p>
						) : (
							<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{' '}
								{/* Use grid for better layout */}
								{formData.assets.map((asset) => (
									<div class='pixel-border p-4 bg-gray-700 rounded flex flex-col justify-between'>
										{/* Asset Info */}
										<div class='flex-1'>
											<div class='flex justify-between items-start mb-2'>
												<div class='flex-1'>
													<div
														class='font-pixel text-financial-green text-sm truncate'
														title={asset.name}
													>
														{asset.name}
													</div>
													<div class='text-xs text-gray-400 font-pixel uppercase'>
														{asset.type}
													</div>
												</div>

												{/* Remove Button */}
												<button
													class='pixel-btn-red bg-financial-red hover:bg-red-700 text-white rounded w-6 h-6 flex items-center justify-center ml-2 flex-shrink-0'
													onClick={() => removeAsset(asset.id)}
													title='Remove asset'
												>
													×
												</button>
											</div>
										</div>

										{/* Asset Details */}
										<div class='flex justify-between items-end pt-2 border-t border-gray-600'>
											<div class='text-xs font-pixel text-financial-blue'>
												{asset.annualReturn}% RETURN
											</div>
											<div class='font-pixel text-financial-green text-sm'>
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
						<div class='pixel-border p-4 bg-gray-800 rounded mt-4'>
							<div class='flex justify-between items-center font-pixel'>
								<span class='text-financial-green'>TOTAL ASSETS:</span>
								<span class='text-xl text-financial-green'>
									$
									{formData.assets
										.reduce((total, asset) => total + asset.value, 0)
										.toFixed(2)
										.toLocaleString()}
								</span>
							</div>
							<div class='text-xs text-gray-400 font-pixel mt-2 text-center'>
								{formData.assets.length} asset{formData.assets.length !== 1 ? 's' : ''} • Avg. Return:{' '}
								{(
									formData.assets.reduce((total, asset) => total + asset.annualReturn, 0) /
									formData.assets.length
								).toFixed(2)}
								%
							</div>
						</div>
					)}
				</SectionCard>
				<div class='flex justify-center'>
					<button
						class='pixel-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full'
						onClick={() => document.getElementById('liabilities')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Next: Liabilities
					</button>
				</div>
			</div>
		</section>
	);
};
