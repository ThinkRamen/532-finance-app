import { IncomeSection } from '../client/components/IncomeSection';
import { AssetsSection } from '../client/components/AssetsSection';
import { LiabilitiesSection } from './components/LiailitiesSection';
import { WelcomeSection } from './components/WelcomeSection';
import { FoooSection } from './components/FoooSection';
import { ProjectionSection } from './components/ProjectionSection';

export default function App() {
	return (
		<>
			<div id='viewport'>
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
			</div>
		</>
	);
}
