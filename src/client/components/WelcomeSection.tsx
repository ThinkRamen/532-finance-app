import { SectionCard } from './SectionCard';

export const WelcomeSection = () => {
	return (
		<section class='flex p-8 bg-gray-900' id='welcome'>
			<div class='flex flex-1 items-center justify-center'>
				<SectionCard>
					<h1 class='font-bold text-green-400 mb-4'>$$$ 532 NET WORTH PROJECTION</h1>
					<h2 class='font-semibold mb-4 text-gray-300 text-xl'>Start Building Your Financial Future!!!</h2>
					<h3 class='font-semibold text-gray-400 text-lg mb-4'>Welcome To Your Financial Dashboard :)</h3>
					<div class='p-4 rounded-lg text-center'>
						<p class='text-gray-400 mb-8'>
							This app will help you visualize and plan your net worth growth using the 50/30/20 budgeting
							strategy. It's great! The 50/30/20 rule is 1 budgeting guideline that suggests that you
							should allocate 50% of your after-tax income towards your essential expenses, 30% towards
							discretionary expenses, and 20% towards savings and debt repayment.
						</p>
						<div class='flex flex-col justify-center items-center'>
							<button
								class='pixel-btn py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-2 w-full text-2xl'
								onClick={() =>
									document.getElementById('income')?.scrollIntoView({ behavior: 'smooth' })
								}
							>
								Get Started
							</button>
							<span class='py-2 text-gray-400'>OR</span>
							<button class='pixel-btn py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg w-full text-2xl'>
								Login
							</button>
						</div>
					</div>
				</SectionCard>
			</div>
		</section>
	);
};
