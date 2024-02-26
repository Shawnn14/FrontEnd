<template>
    <div class="top-window">
        <div class="info-bar">
            <p>Mã chuyến bay</p>
            <p>Điểm đi</p>
            <p>Điểm đến</p>
            <p>Giờ xuất phát</p>
            <p>Chỗ trống</p>
        </div>
        <div class="column-data">
            <div v-for="value in flightBookInfo" class="each-flight">
                <p>{{ value._id }}</p>
                <p>{{ value.departure }}</p>
                <p>{{ value.arrival }}</p>
                <p>{{ value.max_seat }}</p>
                <p>{{ value.empty_seat }}</p>
            </div>
        </div>
    </div>
    <div class="middle-info">
        <div class="bottom-line">
            <p class="title">Tên</p>
            <p class="title-value" v-if="infoUserBook">{{ infoUserBook.name }}</p>
        </div>
        <div class="bottom-line">
            <p class="title">SĐT</p>
            <p class="title-value" v-if="infoUserBook">{{ infoUserBook.phone }}</p>
        </div>
        <div class="bottom-line">
            <p class="title">Email</p>
            <p class="title-value" v-if="infoUserBook">{{ infoUserBook.email }}</p>
        </div>
    </div>
    <div class="bottom">
        <div class="bottom-left">
            <div>Mã số đặt vé</div>
            <input v-model="bookCodeInput" type="text" name="book-code" placeholder="Mã số đặt vé">
        </div>
        <div class="bottom-right">
            <button @click="getBookInfo">Tra thông tin</button>
        </div>
    </div>
</template>
<script setup>
    import {ref, watch, computed} from 'vue';
    import {isPopupVisible, notiContent} from './shareData.js';
    import axios from 'axios';
    
    var bookCodeInput = ref(null)
    var infoUserBook = ref(null)
    var flightBookInfo = ref(null)
    const bookInfoApi = 'http://127.0.0.1:8000/booking/get_book'
    const flightInfoApi = 'http://127.0.0.1:8000/booking/get_flight'

    async function getBookInfo() {

        if (bookCodeInput.value == null) {
            isPopupVisible.value = true
            notiContent.value = 'Bạn cần điền thông tin vé để tìm thông tin đặt vé'
            return
        }

        const params = {
            "id": bookCodeInput.value,
        };

        try {
            var response = await axios.get(bookInfoApi, {
                headers: {
                    'Accept': 'application/json'
                },
                params: params,
            });
        } catch (error) {
            // check if book code is exits
            isPopupVisible.value = true
            notiContent.value = 'Mã chuyến bay không tồn tại'
            return
        }

        infoUserBook.value = response.data['flight']
        var flightCode = infoUserBook.value['flight_code'] 
        bookCodeInput.value = null

        var flightParams = {
            "id": flightCode,
        };

        var response = await axios.get(flightInfoApi, {
            headers: {
                'Accept': 'application/json'
            },
            params: flightParams,
        });

        flightBookInfo.value = [response.data['flight']]
        
        isPopupVisible.value = true
        notiContent.value = 'Lấy thông tin thành công'
    }
    

</script>
<style scoped src="../assets/book_info.css" ></style>
