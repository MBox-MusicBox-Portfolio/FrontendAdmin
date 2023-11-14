<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <h3 class="mt-2 ml-2">Users</h3>
        <div class="d-flex align-items-center">
            <!-- Search -->
            <input type="text" class="input-edit mt-3 mb-3 " placeholder="Search user..." v-model="searchText"/>
        </div>
        <div>
            <!-- List-->
            <ul class="list-group ml-2 mr-2">
                <li v-for="item in filteredUsers" :key="item.index"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
                >
                    <div class="d-flex">
                        <img :src="item.avatar" class="img-fluid rounded-circle user-image" alt="Responsive image">
                        <p class="mt-3 p-3 mr-3 ml-5 text-center text-darl"> {{ item.index }}</p>
                        <p class="mt-3 p-3 text-center text-user-name">{{ item.name }}</p>
                        <p class="mt-3 p-3 mr-3 ml-5 text-center text-user-name">{{ "Role: " + item.role.name }}</p>
                        <p class="mt-3 p-3 mr-3 ml-5 text-center">{{ "Email: " + item.email }}</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            class="btn btn-primary mr-2"
                            @click="editUser"
                        >
                            Edit
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <editVue :userName="'User1'"></editVue>
    </div>
</template>

<script>
import editVue from '../../components/modals/edit/edit.vue';
import UserStatus from '../../json/UserStatus.json';
import {AllUsers}  from '../../utils/axios';

export default {
    data() {
        return {
            searchText: '',
            UserList: ""
        }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.loadUser())
  },
    methods: {
        async loadUser() {
        try {
        const response = await AllUsers(1, 100);
        const data = response.data.value;
        this.UserList=JSON.parse(JSON.stringify((Object.values(data))));
        console.log(data);
         
    } catch (error) {
        console.error("Error loading user data:", error);
    }
    },
        editUser() {
            const response = AllUsers(1,100);
            
        },
    },
    components: {
        editVue
    },
    computed: {
        itemStatusColor() {
            return (index) =>{
                const status = this.UserList[index].status;
                return UserStatus[status]
            }
       },
        filteredUsers() {
            const searchText = this.searchText.toLowerCase().trim();
            if (!searchText) {
                return this.UserList;
            } else {
                return this.UserList.filter((item) =>
                item.name.toLowerCase().includes(searchText)
                );
            }
        }
    }
};
</script>

<style src="./user.scss" lang="scss">

</style>
