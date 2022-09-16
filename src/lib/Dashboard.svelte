<script>
  export let entryList;
  import {isWorkFromHome, selectedWorkOption} from '../stores';
  import Row from './Dashboard/Row.svelte';
</script>

{#if entryList.length !== 0}
  <button on:click={() => $isWorkFromHome = !$isWorkFromHome}>{$selectedWorkOption}</button>
  {$isWorkFromHome ? 'true' : 'false'}
  <table>
    <tr>
      <th><h3>Role</h3></th>
      <th><h3>Staff Required</h3></th>
      <th><h3>Experience Level</h3></th>
      <th><h3>Hire With Agility</h3></th>
      <th><h3>Hire Onshore</h3></th>
      <th><h3>Your Savings</h3></th>
      <th></th>
    </tr>
    {#each entryList as entry (entry[2].id)}
      <Row {entry} id={entry[2].id} on:delete/>
    {/each}
  </table>
{/if}

<style>
  th {
    padding-block: 1rem;
    padding-inline: 2rem;
  }
</style>