<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData
</script>
Dashboard {data.test}
{#if data.user}
    User: {data.user.email}
{/if}