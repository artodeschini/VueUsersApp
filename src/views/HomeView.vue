<template>
   <div class="container">
        <h1>Bem vindo</h1>
        <hr>
        <div>{{user.nome}}</div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
        return {
            password: '',
            email: '',
            user: {}
        }
  },
  methods: {
    getInfo() {
        let token = localStorage.getItem("token");
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        //let user = JSON.parse(jsonPayload);
        this.user = JSON.parse(jsonPayload);
    }
  },
  beforeMount(){
    this.getInfo();
 },
}
</script>
