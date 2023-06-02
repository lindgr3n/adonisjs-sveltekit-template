<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';


  export let data: PageData
  export let form: ActionData

  console.log(data, form)
</script>


<form action="/login" method="post" >
    <input type="text" name="email" id="" value="test@example.com">
    {#if form?.missing}
       Email is required
    {/if}
    <input type="password" name="password" value="password">
    <button>Login</button>
    {#if form?.error}
       {form.error}
    {/if}
</form>