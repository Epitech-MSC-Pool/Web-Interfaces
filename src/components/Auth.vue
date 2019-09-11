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
                                label="Name"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="submit">submit</v-btn>
                        <v-btn type="submit">clear</v-btn>
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

    const AuthResourceService = new AuthService();
    export default {
        $_veeValidate: {
            validator: 'new',
        },
        name: "Auth",
        mixins: [validationMixin],
        validations: {
            password: {required},
            email: {required, email},
        },
        data: () => ({
            password: '',
            email: '',
            dialog: true,
            error: false,
        }),
        computed: {
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
                localStorage.token = req.data
                this.error = false;
                this.dialog = false;
            },

            loginFailed() {
                this.error = 'Login failed!'
                alert(this.error)
                delete localStorage.token
            }
        }
    }
</script>

<style scoped>

</style>