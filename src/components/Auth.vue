<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <form class="form-signin" @submit.prevent="submit">
                        <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="submit">submit</v-btn>
                        <v-btn @click="switchDialog">Register</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">REGISTER</span>
                </v-card-title>
                <v-card-text>
                    <form class="form-register" @submit.prevent="register">
                        <v-text-field
                                v-model="username"
                                :error-messages="usernameErrors"
                                label="Username"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="register">submit</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email} from 'vuelidate/lib/validators'
    import AuthService from "../service/auth_service";
    import UserService from "../service/user_service";

    export default {
        $_veeValidate: {
            validator: 'new',
        },
        name: "Auth",
        mixins: [validationMixin],
        validations: {
            password: {required},
            username: {required},
            email: {required, email},
        },
        data: () => ({
            password: '',
            email: '',
            username: '',
            dialog: true,
            dialog2: false,
            error: false,
        }),
        computed: {
            usernameErrors() {
                const errors = [];
                !this.$v.password.required && errors.push('Username is required.');
                return errors
            },
            nameErrors() {
                const errors = [];
                !this.$v.password.required && errors.push('Password is required.');
                return errors
            },
            emailErrors() {
                const errors = [];
                !this.$v.email.email && errors.push('Must be valid e-mail');
                !this.$v.email.required && errors.push('E-mail is required');
                return errors
            },
        },
        methods: {
            submit() {
                this.$v.$touch();
                console.log(this.$v.$touch());
                console.log(this.email);
                console.log(this.password);
                AuthService.getUserToken(this.email, this.password).then(request => {
                        this.loginSuccessful(request)
                    }
                ).catch(() => this.loginFailed());
            },
            clear() {
                this.$v.$reset();
                this.name = '';
                this.email = '';
            },
            loginSuccessful(req) {
                console.log(req)
                if (!req.data) {
                    this.loginFailed()
                    return
                }
                delete localStorage.token
                localStorage.token = req.data
                this.error = false;
                this.dialog = false;
                UserService.getUser(this.email,this.password).then(request => {
                    console.log(request)
                })
            },

            loginFailed() {
                this.error = 'Login failed!'
                alert(this.error)
                delete localStorage.token
            },
            switchDialog() {
                this.dialog = false;
                this.dialog2 = true;
            },
            register() {
                AuthService.registerUser(this.email, this.password,this.username).then(request => {
                        if (request.status === 201){
                            this.dialog = true;
                            this.dialog2 = false;
                        }
                    }
                ).catch(() => {
                    this.error = 'Register failed!'
                    alert(this.error)
                });
            }
        }
    }
</script>

<style scoped>

</style>