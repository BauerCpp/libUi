import React, { useState } from 'react';
import styles from './Button.m.css';

export default function Button({ text })
{
	const [isPressed, setPressed] = useState(false);

	function handleClick()
	{
		setPressed(!isPressed);
	}

	const root_styles = [
		styles.root,
		isPressed && styles.root_active,
	]
	.filter((elm) => elm)
	.join(' ');

	return (
	<div
		// className={styles.root + (isPressed && styles.root_active)}
		className={root_styles}
		onClick={handleClick}
	>
		<div className={styles.text}>
		{text}
		</div>
	</div>
	);
}