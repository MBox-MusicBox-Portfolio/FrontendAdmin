<template>
    <div>
      <h3 class="mt-2 ml-2">Users</h3>
      <div class="d-flex align-items-center">
        <!-- Search -->
        <input type="text" class="form-control mt-3 mb-3" placeholder="Search user..." v-model="searchText" />
      </div>
      <div>
      
        <ul class="list-group ml-2 mr-2">
          <li v-for="item in filteredUsers" :key="item.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
              <img :src="item.avatar" class="img-fluid rounded-circle user-image" alt="selectedUserName" />
              <div class="ml-3">
                <p class="mb-1 fw-bold user-name">{{ item.name }}</p>
                <p class="mb-1 text-dark">{{ "Role: " + item.role.name }}</p>
                <p class="mb-1 text-dark">{{ "Email: " + item.email }}</p>
                <p class="mb-1 text-dark">{{ "Status: " + (item.isBlocked ? 'Blocked' : 'Active') }}</p>
              </div>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="editUser(item)">Edit</button>
            </div>
          </li>
        </ul>
      </div>
      <editVue :userName="selectedUserName" :photo="photo" :currentRoleName="currentRole.name" ref="editVueRef"></editVue>
    </div>
  </template>
  
  <script>
  import editVue from '../../components/modals/edit/edit.vue';
  import UserStatus from '../../json/UserStatus.json';
  
  import * as request from '../../utils/axios';
  
  export default {
    data() {
      return {
        items: {},
        currentPhoto:'',
        currentRole:'',
        searchText: '',
        UserList: [],
        selectedUserId:"",
        selectedUserName: "",
      };
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => vm.loadUser());
    },
    methods: {
      async loadUser() {
        try {
          const response = await request.UserPagination(1,100);
          this.UserList = response || [];
          //await this.setDefaultImage();
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      },
      editUser(item) {
        this.selectedUserId = item.id;
        this.photo=item.avatar;
        this.currentRole=item.role;
        this.selectedUserName = item.name;
        this.$refs.editVueRef.OpenModal();
      },
      /*
      async setDefaultImage()
      {
       // const response = await getUserLetters(this.getArray());
       this.getArray();
        //console.log(response);
     },
     getArray(){
       this.UserList.forEach(items=>{
         if(items.avatar === null)
         {
            return {
              name: items.name,
              avatar: items.avatar
            }
         }
       })
     }*/
    },
    components: {
      editVue,
    },
    computed: {
      filteredUsers() {
        const searchText = this.searchText.toLowerCase().trim();
        if (!searchText) {
          return this.UserList;
        } else {
          return this.UserList.filter((item) => item.name.toLowerCase().includes(searchText));
        }
      },
    },
  };
  </script>
  
  <style src="./user.scss" lang="scss">
  </style>
  