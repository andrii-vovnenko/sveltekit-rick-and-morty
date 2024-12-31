<script lang="ts">
  import '@picocss/pico'
  import '../app.css'
</script>
<div class="layout">
  <div class="container body">
    <div class="navigation">
      <ul>
        <li>
          <a href="/">Main</a>
        </li>
      </ul>
    </div>
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
    
    .body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }
</style>
