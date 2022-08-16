<template>
   <div class="container">
        <h1>Login</h1>
        <hr>
        <div>
            <div class="field">
                <label class="label has-text-left">Email</label>
                <div class="control">
                    <input class="input" 
                    type="text"
                    v-model="email" 
                    placeholder="Digite o email do usuario">
                </div>
            </div>
            <div class="field">
                <label class="label has-text-left">Senha</label>
                <div class="control">
                    <input class="input" 
                    type="password" 
                    v-model="password"
                    placeholder="Digite a senha do usuario">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-success" @click="logar">Login</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light" @click="limpar">Limpar</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
export default {
  name: 'LoginView',
  components: {
    
  },
   data() {
        return {
            password: '',
            email: ''
        }
    },
    methods: {
        logar() {
            //console.log( this.nome + ' ' + this.password + ' ' + this.email);
            axios.post('http://localhost:8888/login', {
                    "password" : this.password, 
                    "email": this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                this.$router.push({name: 'Home'});
                //this.$route.router.go('/');        
            }).catch(err => {
                console.log(err.response);
            });  
        },
        limpar() {
            this.nome =  '';
            this.password = '';
            this.email = '';
        }
    }
}
</script>
