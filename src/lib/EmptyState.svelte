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
    max-width: 32.5rem;
    margin-inline: auto;
    text-align: center;
  }

  .empty-state-wrapper {
    min-height: 30rem;
    display: grid;
    place-items: center;
  }

  .content {
    max-width: 60rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
  }
</style>