<script>
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
  import {isLoading} from './stores';
  
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

{#if isLoading}
  <div class="loading">
    <p>loading...</p>
  </div>
{:else}
  <main class="calculator">
    <div class="container flex-column-gap">
      {#if entryList.length === 0}
        <EmptyState on:addRole={addRoleHandler} />
      {:else}
        <Actions on:addRole={addRoleHandler}/>
        <Dashboard {entryList} on:delete={deleteDispatchHandler} />
        <Summary on:toggleModal={() => isModalOpen = !isModalOpen} />
      {/if}
    </div>
  </main> 
{/if}


<Dialog class="dialog-wrapper" open={isModalOpen} on:close={() => {isModalOpen = false}}>
  <DialogOverlay class="dialog-overlay" />
  <button on:click={closeModal} class="close-x-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
  {#if isDoneWithForm}
    <div class="dialog-content">
      <DialogTitle class="dialog-title">Thank you for your form submission!</DialogTitle>
      <DialogDescription class="dialog-description">We've sent a summary of the data to your email. We'll reach out within 24 hours.</DialogDescription>
      <button class="close-button" on:click={closeModal}>Close</button>
    </div>
  {:else}
    <div class="dialog-content">
      <DialogTitle class="dialog-title">Get More Information</DialogTitle>
      <DialogDescription class="dialog-description">If you would like to find out more about how outsourcing can help your business, please provide your contact details and we'll contact you within 24 hours.</DialogDescription>
      <CtaForm on:closeModal={closeModal} on:isDone={formSubmitHandler}/>
    </div>
  {/if}
</Dialog>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  :global(:root) {
    --primary-clr-50: #F2F2FC;
    --primary-clr-100: #E1E2F8;
    --primary-clr-200: #C9CAF4;
    --primary-clr-300: #A4A8EC;
    --primary-clr-400: #797DE1;
    --primary-clr-500: #5450D5;
    --primary-clr-600: #5245CB;
    --primary-clr-700: #4E3CB9;
    --primary-clr-800: #473697;
    --primary-clr-900: #3B3078;

    --neutral-clr-50: #F8FAFC;
    --neutral-clr-100: #F1F5F9;
    --neutral-clr-200: #E2E8F0;
    --neutral-clr-300: #CBD5E1;
    --neutral-clr-400: #94A3B8;
    --neutral-clr-500: #64748B;
    --neutral-clr-600: #475569;
    --neutral-clr-700: #334155;
    --neutral-clr-800: #1E293B;
    --neutral-clr-900: #0F172A;
  }

  :global(body) {
    font-family: 'Inter', sans-serif;
    max-width: 76rem;
    margin-inline: auto;
    margin-block: 50px;
  }

  :global(button, input) {
    font-family: 'Inter', sans-serif;
  }

  /* :global(::-webkit-scrollbar) {
    width: .5rem;
    height: .5rem;
  }
  :global(::-webkit-scrollbar-track) {
    background-color: var(--primary-clr-50);
  }
  :global(::-webkit-scrollbar-thumb) {
    background-color: var(--primary-clr-200);
    border-radius: 1rem;
  } */

  main {
    max-width: 76rem;
    margin-inline: auto;
  }

  .container {
    max-width: 76rem;
    margin-inline: auto;
  }

  :global(.flex-column-gap) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

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

  :global(.text-align-left) {
    text-align: left;
  }

  :global(.text-align-center) {
    text-align: center;
  }
  
  :global(.text-align-right) {
    text-align: right;
  }

  :global(.text-primary) {
    color: var(--primary-clr-500);
  }

  :global(.font-medium) {
    font-weight: 500;
  }

  :global(.dialog-wrapper) {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  :global(.dialog-overlay) {
    background-color: var(--neutral-clr-900);
    position: absolute;
    inset: 0;
    opacity: 50%;
    z-index: -1;
  }

  .dialog-content {
    max-width: 25rem;
    margin-inline: auto;
    background-color: white;
    padding: 2rem;
    border-radius: .75rem;
    display: flex;
    flex-direction: column;
  }

  .close-button {
    flex-grow: 1;
    padding: 10px 18px;
    border: 1px solid var(--neutral-clr-300);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: .5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  :global(.dialog-title) {
    color: var(--neutral-clr-700);
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin: 0;
    margin-bottom: .5rem;
  }
  
  :global(.dialog-description) {
    color: var(--neutral-clr-500);
    font-size: .875rem;
    line-height: 1.25rem;
    margin: 0;
    margin-bottom: 2rem;
  }

  .loading {
    height: 100%;
    display: grid;
    place-items: center;
  }
</style>
