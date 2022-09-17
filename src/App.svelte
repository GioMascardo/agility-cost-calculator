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
  }

  // newEntry = [[{...}, {...}, {id: ...}]]
  // entry = [{...}, {...}, {id: ...}]

  $: deleteDispatchHandler = (event) => {
    entryList = entryList.filter(entry => entry[2].id !== event.detail);
  }

  let isModalOpen = false;
  let isDoneWithForm = false;
  const closeModal = () => isModalOpen = false;
  function formSubmitHandler() {
    isDoneWithForm = true;
  }
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
  <button on:click={closeModal} class="close-x-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
  <DialogOverlay class="dialog-overlay" />
  {#if isDoneWithForm}
    <DialogTitle>Thank you for your form submission!</DialogTitle>
    <DialogDescription>We've sent a summary of the data to your email. We'll reach out within 24 hours.</DialogDescription>
    <button on:click={closeModal}>Close</button>
  {:else}
    <DialogTitle>Get More Information</DialogTitle>
    <DialogDescription>If you would like to find out more about how outsourcing can help your business, please provide your contact details and we'll contact you within 24 hours.</DialogDescription>
    <CtaForm on:closeModal={closeModal} on:isDone={formSubmitHandler}/>
  {/if}
</Dialog>

<style>
  :global(.dialog-wrapper) {
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
    z-index: 10;
  }

  .close-x-button {
    position: absolute;
    display: grid;
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    color: #64748B;
    top: 1rem;
    right: 1rem;
  }

  /* :global(.dialog-overlay) {

  } */
</style>
