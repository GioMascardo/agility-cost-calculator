<script>
  import { createEventDispatcher } from "svelte";


	$: count = 1;
	const dispatch = createEventDispatcher()
	const dispatcher = () => {
		dispatch('countChange', {count: count})
	}

	const incrementHandler = () => {
		count += 1
		dispatcher()
	}

	const decrementHandler = () => {
		count == 1 ? 1 : count -= 1
		dispatcher()
	}
</script>

<div class="counter">
	<button class="counter-button minus" on:click={decrementHandler} aria-label="Decrease the counter by one">
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
	</button>

	<div class="counter-viewport">
			<p>{count}</p>
	</div>

	<button class="counter-button plus" on:click={incrementHandler} aria-label="Increase the counter by one">
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
	</button>
</div>

<style>
	.counter {
		--neutral-300: #CBD5E1;
		--neutral-500: #64748B;
		--neutral-700: #334155;
		display: flex;
		border: 1px solid var(--neutral-300);
		border-radius: 4px;
		width: min-content;
	}

	.counter-viewport {
		padding-block: 3px;
		padding-inline: 20px;
	}

	p {
		color: var(--neutral-700);
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		margin: 0;
	}

	.counter-button {
		background-color: transparent;
		border: none;
		display: grid;
		padding-block: .25rem;
		padding-inline: .5rem;
		place-items: center;
		cursor: pointer;
	}

	.minus {
		border-right: 1px solid #CBD5E1;
		color: var(--neutral-500);
	}
	.plus {
		border-left: 1px solid #CBD5E1;
		color: var(--neutral-500);
	}

</style>
