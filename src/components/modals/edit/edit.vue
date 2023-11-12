<template>
    <div>
        <form>
            <div class="modal" id="modal-edit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title text-title-modal">
                                Edit user: {{ userName }}
                            </p>
                        </div>
                        <div class="modal-body">
                            <div>
                                <!-- Edit Status-->
                                <p class="text-edit-label m-0">Status</p>
                                <select
                                    id="testSelect"
                                    class="mb-3 mt-1 pl-2 form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                >
                                    <option value="user">User</option>
                                    <option value="musician">Musician</option>
                                    <option value="producer">Producer</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">
                                        Super admin
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="mr-2 btn btn-primary">
                                    Save
                                </button>
                                <button class="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.esm';
import {Modal} from '../../../../node_modules/bootstrap/dist/js/bootstrap.esm';

export default {
    props: {
        userId: String,
        userName: String,
        userStatus: String
    },
    methods: {
        SaveModalInformation() {},
        CloseModal() {},
        OpenModal() {
            let modalShow = new Modal(
                document.getElementById('modal-edit'),
                {}
            );
            modalShow.show();
        }
    }
};
</script>

<style src="./edit.scss"></style>
