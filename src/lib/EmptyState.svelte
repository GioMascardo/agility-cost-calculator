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
  .empty-state-wrapper {
    min-height: 684px;
    display: grid;
    place-items: center;
  }

  .content {
    max-width: 520px;
    display: flex;
    flex-direction: column;
  }
</style>