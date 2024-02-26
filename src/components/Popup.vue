<template>
    <div v-if="isPopupVisible" class="popup-overlay">
        <div class="popup">
            <span class="close-button" @click="closePopup">
                <img src="../../../close-popup.svg" alt="">
            </span>
            <h2>Thông báo</h2>
            <div class="noti-contents">
                <p>{{ notiContent }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref, watch, computed} from 'vue';
    import {isPopupVisible, notiContent} from './shareData.js';


    function closePopup() {
        isPopupVisible.value = false
    }

</script>
<style scoped src="../assets/popup.css" ></style>