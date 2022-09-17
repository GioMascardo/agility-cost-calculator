<script>
  import { createEventDispatcher } from 'svelte';
  import {totalEstimate} from '../stores';

  const dispatch = createEventDispatcher()
  function ctaHandler() {
    dispatch('toggleModal')
  }
</script>

<div class="summary-section">
  <div class="estimate-wrapper">
    <h3>Estimate Monthly Cost: </h3>
    <span class="estimate">{$totalEstimate}</span>
  </div>
  <button class="cta-button" on:click={ctaHandler}>Get More Information</button>
</div>