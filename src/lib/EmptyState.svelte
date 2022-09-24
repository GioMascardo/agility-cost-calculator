<script>
  import Actions from "./Actions.svelte";
</script>

<div class="empty-state-wrapper">
  <div class="content">
    <h1>Build your offshore team with Agility</h1>
    <Actions on:addRole />
  </div>
</div>

<style>
  h1 {
    max-width: 40rem;
    margin-inline: auto;
    text-align: center;
  }

  .empty-state-wrapper {
    min-height: 20rem;
  }

  .content {
    max-width: 50rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
  }

  .content > :global(.actions-wrapper) {
    justify-content: center;
  }
</style>