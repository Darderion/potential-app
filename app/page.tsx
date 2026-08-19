'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import { calculateResults } from './calculations';

export default function Home() {
	const [pulls, setPulls] = useState<number | string>(100);
	const [item1Count, setItem1Count] = useState<number>(1);
	const [item2Count, setItem2Count] = useState<number>(1);

	const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		if (value === '') {
			setPulls('');
		} else {
			const num = parseInt(value);
			if (!isNaN(num) && num >= 1 && num <= 2000) {
				setPulls(num);
			}
		}
	};

	const handleCountChange = (
		setter: React.Dispatch<React.SetStateAction<number>>,
		currentValue: number,
		delta: number
	): void => {
		const newValue = currentValue + delta;
		if (newValue >= 0 && newValue <= 6) {
			setter(newValue);
		}
	};

	const getNumericValue = (value: number | string): number => {
		return typeof value === 'string' ? parseInt(value) || 0 : value;
	};

	const results = useMemo(() => {
		return calculateResults({
			pulls: getNumericValue(pulls),
			kaltsit: item1Count,
			closure: item2Count
		});
	}, [pulls, item1Count, item2Count]);

	const chance = results?.chance ?? 0;

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<h1 className={styles.title}>Pulls probability</h1>

				<div className={styles.controlGroup}>
					<label className={styles.label}>Pulls stashed</label>
					<div className={styles.inputGroup}>
						<input
							type="text"
							value={pulls}
							onChange={handleTotalChange}
							className={styles.totalInput}
						/>
						<span className={styles.rangeIndicator}>1 - 2000</span>
					</div>
				</div>

				<div className={styles.itemsRow}>
					<div className={styles.itemCard}>
						<div className={styles.imageContainer}>
							<img
								src="/Kaltsit.png"
								alt="Kaltsit"
								className={styles.itemImage}
							/>
						</div>
						<div className={styles.itemControls}>
							<h2 className={styles.itemTitle}>Kaltsit</h2>
							<div className={styles.counterControls}>
								<button
									onClick={() => handleCountChange(setItem1Count, item1Count, -1)}
									className={styles.counterBtn}
									disabled={item1Count === 0}
								>
									−
								</button>
								<span className={styles.counterValue}>{item1Count}</span>
								<button
									onClick={() => handleCountChange(setItem1Count, item1Count, 1)}
									className={styles.counterBtn}
									disabled={item1Count === 6}
								>
									+
								</button>
							</div>
						</div>
					</div>

					<div className={styles.itemCard}>
						<div className={styles.imageContainer}>
							<img
								src="/Closure.png"
								alt="Closure"
								className={styles.itemImage}
							/>
						</div>
						<div className={styles.itemControls}>
							<h2 className={styles.itemTitle}>Closure</h2>
							<div className={styles.counterControls}>
								<button
									onClick={() => handleCountChange(setItem2Count, item2Count, -1)}
									className={styles.counterBtn}
									disabled={item2Count === 0}
								>
									−
								</button>
								<span className={styles.counterValue}>{item2Count}</span>
								<button
									onClick={() => handleCountChange(setItem2Count, item2Count, 1)}
									className={styles.counterBtn}
									disabled={item2Count === 6}
								>
									+
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.summary}>
					<div className={styles.summaryItem}>
						<span>Success Chance:</span>
						<strong>{chance.toFixed(2)}%</strong>
					</div>
				</div>
			</div>
		</div>
	);
}