<template>
    <div>
        <form>
            <div class="modal" id="modal-edit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                           <div>
                                <div class="d-flex justify-content-center m-2">
                                    <div class="modal-group-acc">
                                        <img :src="group.img_url" class="img-modal-group-acc">
                                    </div>
                                    <div class="modal-user-acc">

                                    </div>
                                </div>
                                <div>
                                    <!-- Options -->
                                </div>
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
    data() {
        return {
            index: String,
            group: Array,
            producer: Array
        }
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

<style src="./open.scss"></style>
