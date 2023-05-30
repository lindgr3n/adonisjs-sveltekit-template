<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';


  export let data: PageData
  export let form: ActionData
</script>


<form action="/register" method="post" use:enhance>
    <input type="text" name="email" id="" value="test@example.com">
    {#if form?.email}
       Email is required
    {/if}
    <input type="password" name="password" value="password">
    <button>Registrera</button>
    {#if form?.error}
       {form.error}
    {/if}
</form>