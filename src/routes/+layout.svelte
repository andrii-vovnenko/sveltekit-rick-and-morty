<script lang="ts">
  import '@picocss/pico'
  import '../app.css'
</script>
<div class="layout">
  <div class="content">
    <slot />
  </div>
  
  <footer>
    <p>© 2024 My App</p>
  </footer>  
</div>
<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    
    .content {
      flex-grow: 1;
    }
  }
</style>
