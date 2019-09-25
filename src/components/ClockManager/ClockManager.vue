<template>
    <h1>{{username}}</h1>


</template>

<script>
    import User from "../../entity/user";
    import ClockService from "../../service/clock_service";
    let user = localStorage.getItem('user');
    let moment = require('moment');
    moment.locale("fr");
    export default {
        name: "ClockManager",
        data: () => ({
            email: user.email,
            username: user.username,
            role: user.role,
            userid: user.id, 
            startDateTime: moment().format("YYYY MMMM Do, h:mm:ss"),
            clockIn: false
        }),
         methods: {
            refresh: function () {
                ClockService.getClock(userid);
                
            },
            clock: function (){
                if (clockIn == false) {
                    clockIn = true;
                    startDateTime: moment().format("YYYY MMMM Do, h:mm:ss");
                }
                else {
                    clockIn = false;
                    // call working time here
                }
            }
        }
    }
</script>

<style scoped>

</style>