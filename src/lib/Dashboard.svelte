<script>
  export let entryList;
  import {isWorkFromHome} from '../stores';
  import Row from './Dashboard/Row.svelte';
  import {
    TabGroup,
    Tab,
    TabList,  } from "@rgossiaux/svelte-headlessui";
  
</script>

<div class="dashboard">
  <!-- <button on:click={() => $isWorkFromHome = !$isWorkFromHome}>{$selectedWorkOption}</button> -->
  <TabGroup>
    <TabList class="tabList">
      <Tab class={$isWorkFromHome ? 'tab selectedTab' : 'tab'} on:click={() => $isWorkFromHome = true}>Work From Home</Tab>
      <Tab class={!$isWorkFromHome ? 'tab selectedTab' : 'tab'} on:click={() => $isWorkFromHome = false}>Office</Tab>
    </TabList>
  </TabGroup>
  <table>
    <tr class="top-row">
      <th><h3 class="text-align-left role">Role</h3></th>
      <th><h3 class="text-align-center">Staff Required</h3></th>
      <th><h3 class="text-align-center">Experience Level</h3></th>
      <th><h3 class="text-align-right">Hire With Agility</h3></th>
      <th><h3 class="text-align-right">Hire Onshore</h3></th>
      <th><h3 class="text-align-right">Your Savings</h3></th>
      <th></th>
    </tr>
    {#each entryList as entry (entry[2].id)}
      <Row {entry} id={entry[2].id} on:delete />
    {/each}
  </table>
</div>

<style>
  .dashboard {
    min-height: 20rem;
  }
  
  :global(.tabList) {
    display: flex;
  }

  :global(.tab) {
    flex-grow: 1;
    padding: 1rem;
    background-color: white;
    color: var(--neutral-clr-500);
    border-radius: .5rem;
    border: none;
    cursor: pointer;
    font-weight: 500;
  }

  :global(.selectedTab) {
    background-color: var(--primary-clr-50);
    color: var(--primary-clr-400);
    font-weight: 500;
    line-height: 1.5rem;
  }
  
  table {
    border-spacing: 0;
    min-width: 100%;
  }

  .top-row {
    background-color: var(--neutral-clr-50);
    color: var(--neutral-clr-500);
    border: none;
    border-bottom: 1px solid var(--neutral-clr-200);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .top-row > th > h3 {
    font-size: .75rem;
    line-height: 1.125rem;
    margin: 0;
  }

  th {
    padding-block: 1rem;
    padding-inline: 2rem;
  }
</style>