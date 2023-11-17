<template>
	<div>User {{ page }}</div>
	<RouterLink to="/users/1">1</RouterLink>
	<RouterLink to="/users/2">2</RouterLink>
	<RouterLink to="/users/3">3</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

	const {page} = defineProps<{page: string}>()
</script>