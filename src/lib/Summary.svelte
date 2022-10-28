<script>
  import { createEventDispatcher } from 'svelte';
  import {totalEstimate, currentCurrency} from '../stores';

  const dispatch = createEventDispatcher()
  function ctaHandler() {
    dispatch('toggleModal')
  }
</script>

<div class="summary-section">
  <div class="estimate-wrapper">
    <h3>Estimate Monthly Cost: </h3>
    <span class="estimate text-primary">{$currentCurrency === 'gbp' ? '£' : '$'}{$totalEstimate}</span>
  </div>
  <button class="cta-button" on:click={ctaHandler}>Get More Information</button>
</div>

<style>
  .summary-section {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    align-items: center;
  }

  @media (max-width: 40rem) {
    .summary-section {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .estimate-wrapper {
    display: flex;
    gap: .5rem 2rem;
    align-items: center;
  }

  .estimate-wrapper h3 {
    color: var(--neutral-clr-500);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.875rem;
  }

  .estimate {
    font-size: 3rem;
    font-weight: 600;
    line-height: 3.75rem;
    letter-spacing: -0.02em;
  }

  :global(.cta-button) {
    background-color: var(--primary-clr-500);
    color: var(--primary-clr-50);
    cursor: pointer;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    padding-block: .625rem;
    padding-inline: 1rem;
    border: 1px solid var(--primary-clr-500);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: .5rem;
  }

  :global(.cta-button:hover) {
    background-color: var(--primary-clr-600)
  }
</style>