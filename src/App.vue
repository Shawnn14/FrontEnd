<template>
<div class="container">
    <div class="middle">
        <div class="left">
            <div class="tab" @click="changeToBook">
                Đặt vé 
            </div>
            <div class="tab" @click="changeToSearch">
                Tìm kiếm
            </div>
            <div class="tab" @click="changeToUpdate">
                Thay đổi thông tin/Huỷ
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
            <popup></popup>
        </div>
    </div>
</div>
</template>

<script setup>
    import Popup from './components/Popup.vue'
    import {ref, watch, computed} from 'vue';
    import {router} from './router.js'

    function changeToBook() {
        router.push('/')
    }

    function changeToSearch() {
        router.push('/search')
    }

    function changeToUpdate() {
        router.push('/updateInfo')
    }
    
</script>
<style src="./assets/app.css" ></style>
