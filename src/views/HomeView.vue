<template>
   <div class="container">
        <h1>Listar Usuarios</h1>
        <hr>
        sjkdjalkjsdlskajlksajd
        
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
export default {
  name: 'HomeView',
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
