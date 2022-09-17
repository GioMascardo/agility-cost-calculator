<script lang="ts">
  import Actions from './lib/Actions.svelte';
  import Dashboard from './lib/Dashboard.svelte';
  import fetchRoleList from "./lib/helper/fetchRolesList";
  import { v4 as uuidv4 } from 'uuid'
  import Summary from './lib/Summary.svelte';
  import EmptyState from './lib/EmptyState.svelte';
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  } from "@rgossiaux/svelte-headlessui";
  import CtaForm from './lib/CtaForm.svelte';
  
  
  $: entryList = [];
  $: addRoleHandler = async (event) => {
    let newEntry;
    newEntry = await fetchRoleList(event.detail.role);
    let uuid = uuidv4();
    newEntry = [...newEntry, {id: uuid}]
    entryList = [...entryList, newEntry];
    console.log(entryList, 'entry list');
  }

  // newEntry = [[{...}, {...}, {id: ...}]]
  // entry = [{...}, {...}, {id: ...}]

  $: deleteDispatchHandler = (event) => {
    entryList = entryList.filter(entry => entry[2].id !== event.detail);
  }

  let isModalOpen = false;
</script>

<main class="calculator">
  <Actions on:addRole={addRoleHandler}/>
  {#if entryList.length === 0}
    <EmptyState on:addRole={addRoleHandler} />
  {:else}
    <Dashboard {entryList} on:delete={deleteDispatchHandler} />
    <Summary on:toggleModal={() => isModalOpen = !isModalOpen} />
  {/if}
</main>

<Dialog class="dialog-wrapper" open={isModalOpen} on:close={() => {isModalOpen = false}}>
  <DialogOverlay class="dialog-overlay" />
  <DialogTitle>Get More Information</DialogTitle>
  <DialogDescription>If you would like to find out more about how outsourcing can help your business, please provide your contact details and we'll contact you within 24 hours.</DialogDescription>
  <CtaForm on:closeModal={() => isModalOpen = false} {entryList} />
</Dialog>

<style>
  :global(.dialog-wrapper) {
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
    z-index: 10;
  }

  :global(.dialog-overlay) {

  }
</style>
