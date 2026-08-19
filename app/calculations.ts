interface CalculationInput {
	pulls: number;
	kaltsit: number;
	closure: number;
}

interface CalculationResult {
	chance: number;
}

const NO_PITY = 50
const PITY_INCREMENT = 2
const BASE_SIX_STAR = 2
const SAMPLE_SIZE = 10000
const CHANCE_RATE_UP = 35

const getRandom = () => {
	return Math.random() * 100;
}

const Chance6Star = (howManyBeforeWithout6Star: number) => {
	if (howManyBeforeWithout6Star <= NO_PITY) {
		return BASE_SIX_STAR
	} else {
		return BASE_SIX_STAR + (howManyBeforeWithout6Star - NO_PITY) * PITY_INCREMENT
	}
}

const getPulls = (pulls: number, kaltsit: number, closure: number) => {
	let howManyBeforeWithout6Star = 0
	let kaltsitPulled = 0
	let closurePulled = 0
	for (let i = 0; i < pulls; i++) {
		const pull = getRandom()
		if (pull <= Chance6Star(howManyBeforeWithout6Star)) {
			howManyBeforeWithout6Star = 0
			const pull6Star = getRandom()
			if (pull6Star <= 2 * CHANCE_RATE_UP) {
				const pulledKaltsit = getRandom()
				if (pulledKaltsit < 50) {
					kaltsitPulled++
				} else {
					closurePulled++
				}
			}
		} else {
			howManyBeforeWithout6Star++
		}
	}

	if (pulls >= 300) kaltsitPulled++
	
	const pity = Math.floor(pulls / 300)

	const pityNeeded = Math.max(kaltsit - kaltsitPulled, 0) + Math.max(closure - closurePulled, 0)

	if (pityNeeded <= pity) {
		return 1
	} else {
		return 0
	}
}

const getRoll = (input: CalculationInput) => {
	let successes = 0
	for (let i = 0; i < SAMPLE_SIZE; i++) {
		successes += getPulls(input.pulls, input.kaltsit, input.closure)
	}

	return successes
}

export const calculateResults = (input: CalculationInput): CalculationResult => {
	const rolls = getRoll(input)

	return {
		chance: rolls * 100 / SAMPLE_SIZE
	};
};