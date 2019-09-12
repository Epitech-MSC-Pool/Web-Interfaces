<template>
    <h1>Bienvenue sur la page {{username}}</h1>
</template>

<script>
    import User from "../../entity/user";
    let user = localStorage.getItem('user');
    export default {
        name: "User",
        data: () => ({
            email: user.email,
            username: user.username,
            role: user.role,
        }),
    }
</script>

<style scoped>

</style>