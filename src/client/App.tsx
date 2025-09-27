import { IncomeSection } from '../client/components/IncomeSection'
import { AssetsSection } from '../client/components/AssetsSection'
import { LiabilitiesSection } from './components/LiailitiesSection';
import { WelcomeSection } from './components/WelcomeSection';
import { FoooSection } from './components/FoooSection';
import { ProjectionSection } from './components/ProjectionSection';

export default function App() {
	return (
		<>
			<div class="flex sticky top-0 z-50 h-16 w-screen bg-gray-800 text-white mb-4 px-6">

				<div class="flex-1 flex items-center justify-center">


				</div>

				<div class="flex-1 flex items-center justify-center">

					<h1 class="font-bold">Menu</h1>

				</div>

				<div class="flex-1 flex items-center justify-end">
					<button id="menu-btn" class="p-2 rounded hover:bg-gray-700 transition duration-200">
						<svg viewBox="0 0 100 80" width="32" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
							<rect width="100" height="20"></rect>
							<rect y="30" width="100" height="20"></rect>
							<rect y="60" width="100" height="20"></rect>
						</svg>
					</button>
				</div>
			</div>
			{/* WELCOME SECTION */}
			<WelcomeSection />
			{/* <!-- INCOME INPUT SECTION --> */}
			<IncomeSection />
			{/* <!-- ASSETS INPUT SECTION --> */}
			<AssetsSection />
			{/* LIABILITIES SECTION */}
			<LiabilitiesSection />

			{/* IF LOGGED IN, SKIP TO HERE */}
			{/* SNAPSHOT */}

			{/* FINANCIAL ORDER OF OPERATIONS SECTION*/}
			<FoooSection />
			{/* PROJECTION SECTION*/}
			<ProjectionSection />
			{/* SPREADSHEET */}
			{/* GRAPH */}

			{/* COMPARISON: INITIAL PROJECTION VS CURRENT PERFORMANCE */}
			{/*  AI ANALYSIS */}
			{/* AFFIRMATION OR SCOLDING */}
		</>
	)
}
